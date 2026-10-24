/**
 * AUDIO CONTROLLER: Web Speech Synthesis API
 * Cung cấp tính năng phát âm bản ngữ chuẩn (US / UK)
 */

class AudioController {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.selectedVoice = null;
    this.rate = 0.9; // Tốc độ tự nhiên vừa phải cho người học
    this.pitch = 1.0;

    if (this.synth) {
      this.initVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    this.voices = this.synth.getVoices();
    // Ưu tiên chọn giọng tiếng Anh bản ngữ (Google US/UK, Samantha, Daniel, v.v.)
    const preferredVoices = this.voices.filter(v => v.lang.startsWith('en'));
    if (preferredVoices.length > 0) {
      // Ưu tiên en-US hoặc en-GB
      this.selectedVoice = preferredVoices.find(v => v.lang === 'en-US') || 
                           preferredVoices.find(v => v.lang === 'en-GB') || 
                           preferredVoices[0];
    }
  }

  /**
   * Phát âm một từ hoặc đoạn văn bản tiếng Anh
   * @param {string} text - Từ hoặc câu cần đọc
   * @param {number} customRate - Tốc độ đọc (mặc định 0.9)
   * @param {function} onEndCallback - Callback khi đọc xong
   */
  speak(text, customRate = null, onEndCallback = null) {
    if (!this.synth) {
      console.warn('Trình duyệt của bạn không hỗ trợ Web Speech Synthesis.');
      return;
    }

    // Nếu đang phát âm thì hủy lượt cũ để đọc câu mới ngay
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const cleanText = text.trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = customRate || this.rate;
    utterance.pitch = this.pitch;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    if (onEndCallback) {
      utterance.onend = onEndCallback;
    }

    this.synth.speak(utterance);
  }

  /**
   * Đọc chậm (Slow mode 0.7x) dành cho người mới bắt đầu luyện nghe âm
   */
  speakSlow(text, onEndCallback = null) {
    this.speak(text, 0.65, onEndCallback);
  }
}

// Khởi tạo instance toàn cục
window.audioController = new AudioController();

// Hàm tiện ích toàn cục gắn trực tiếp vào các nút icon loa HTML
function playPronounce(text, isSlow = false, buttonEl = null) {
  if (buttonEl) {
    buttonEl.classList.add('animate-pulse', 'text-indigo-600', 'dark:text-indigo-400');
  }

  const callback = () => {
    if (buttonEl) {
      buttonEl.classList.remove('animate-pulse', 'text-indigo-600', 'dark:text-indigo-400');
    }
  };

  if (isSlow) {
    window.audioController.speakSlow(text, callback);
  } else {
    window.audioController.speak(text, null, callback);
  }
}
