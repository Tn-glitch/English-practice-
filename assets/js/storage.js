/**
 * STORAGE CONTROLLER: Quản lý trạng thái học tập, LocalStorage & Gamification
 */

const STORAGE_KEY = 'ENG_LEARNING_APP_STATE';

const DEFAULT_STATE = {
  userLevel: 'A1',
  completedLessons: [],
  userXP: 0,
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  flashcardMastery: {}, // { "Hello": true }
  quizScores: {},       // { "a1-1": { score: 3, total: 3 } }
  placementTest: null,  // { level: 'B1', score: 9, maxScore: 15, date: '...' }
  badges: ['welcome'],  // ['welcome', 'first_quiz', 'a1_master', 'streak_3']
  theme: 'light'
};

class StorageController {
  constructor() {
    this.state = this.loadState();
    this.checkStreak();
  }

  loadState() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return { ...DEFAULT_STATE, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Không thể đọc dữ liệu từ LocalStorage', e);
    }
    return { ...DEFAULT_STATE };
  }

  saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('Không thể lưu dữ liệu vào LocalStorage', e);
    }
  }

  checkStreak() {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.state.lastStudyDate;

    if (lastDate === today) {
      // Đã học hôm nay, giữ nguyên
      return;
    }

    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    if (lastDate === yesterday) {
      // Học liên tục tiếp theo
      this.state.streakDays += 1;
      this.state.lastStudyDate = today;
      this.saveState();
    } else if (lastDate < yesterday) {
      // Bị gián đoạn
      this.state.streakDays = 1;
      this.state.lastStudyDate = today;
      this.saveState();
    }
  }

  recordStudyActivity() {
    const today = new Date().toISOString().split('T')[0];
    this.state.lastStudyDate = today;
    this.saveState();
  }

  addXP(amount) {
    this.state.userXP += amount;
    this.checkBadges();
    this.saveState();
    return this.state.userXP;
  }

  completeLesson(lessonId, score = 0, totalQuestions = 0) {
    if (!this.state.completedLessons.includes(lessonId)) {
      this.state.completedLessons.push(lessonId);
    }
    if (totalQuestions > 0) {
      this.state.quizScores[lessonId] = { score, total: totalQuestions };
    }
    this.recordStudyActivity();
    this.checkBadges();
    this.saveState();
  }

  isLessonCompleted(lessonId) {
    return this.state.completedLessons.includes(lessonId);
  }

  setPlacementResult(level, score, total) {
    this.state.placementTest = {
      level,
      score,
      total,
      date: new Date().toLocaleDateString('vi-VN')
    };
    this.state.userLevel = level;
    this.addXP(100); // Thưởng 100 XP hoàn thành bài test đầu vào
    if (!this.state.badges.includes('placement_done')) {
      this.state.badges.push('placement_done');
    }
    this.saveState();
  }

  toggleFlashcardMastery(word) {
    const isMastered = !!this.state.flashcardMastery[word];
    this.state.flashcardMastery[word] = !isMastered;
    if (!isMastered) {
      this.addXP(10); // Thưởng 10 XP khi nhớ 1 từ mới
    }
    this.saveState();
    return this.state.flashcardMastery[word];
  }

  isWordMastered(word) {
    return !!this.state.flashcardMastery[word];
  }

  checkBadges() {
    const newBadges = [];
    if (this.state.completedLessons.length >= 1 && !this.state.badges.includes('first_step')) {
      newBadges.push('first_step');
    }
    if (this.state.completedLessons.length >= 5 && !this.state.badges.includes('diligent_student')) {
      newBadges.push('diligent_student');
    }
    if (this.state.userXP >= 300 && !this.state.badges.includes('xp_master_300')) {
      newBadges.push('xp_master_300');
    }
    if (this.state.streakDays >= 3 && !this.state.badges.includes('streak_3')) {
      newBadges.push('streak_3');
    }

    if (newBadges.length > 0) {
      this.state.badges.push(...newBadges);
      this.saveState();
    }
  }

  setTheme(theme) {
    this.state.theme = theme;
    this.saveState();
  }

  resetAllProgress() {
    this.state = { ...DEFAULT_STATE };
    this.saveState();
  }
}

window.appStorage = new StorageController();
