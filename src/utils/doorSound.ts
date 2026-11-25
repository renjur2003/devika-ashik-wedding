/**
 * Ceremonial Auspicious Sound Synthesizer
 * Uses Web Audio API to create authentic, soothing temple chimes, 
 * resonant brass bells, and gentle airy whooshes without external audio file dependencies.
 */

class DoorSoundSynthesizer {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  /**
   * Resonant Kerala Temple Bell / Singing Bowl Chime (Auspicious 528Hz + harmonics)
   */
  public playTempleBell() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const fundamental = 528; // Auspicious frequency (Solfeggio / Love frequency)
      const harmonics = [
        { freq: fundamental, gain: 0.35, decay: 3.5 },
        { freq: fundamental * 1.5, gain: 0.2, decay: 2.8 },
        { freq: fundamental * 2.02, gain: 0.15, decay: 2.2 },
        { freq: fundamental * 2.76, gain: 0.08, decay: 1.5 },
        { freq: fundamental * 3.8, gain: 0.04, decay: 1.0 },
      ];

      harmonics.forEach(({ freq, gain, decay }) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gainNode.gain.setValueAtTime(0, now);
        // Soft immediate attack
        gainNode.gain.linearRampToValueAtTime(gain, now + 0.02);
        // Exponential bell decay
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

        osc.connect(gainNode);
        gainNode.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + decay);
      });
    } catch {
      // Audio playback silently gracefully ignored if blocked by browser
    }
  }

  /**
   * Magical Airy Whoosh / Golden Shimmer Wind
   */
  public playMagicalWhoosh() {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 1.8;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pinkish noise for warm air sweep
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99 * b0 + white * 0.05;
        b1 = 0.95 * b1 + white * 0.1;
        b2 = 0.85 * b2 + white * 0.2;
        data[i] = (b0 + b1 + b2) * 0.3;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.8);
      filter.frequency.exponentialRampToValueAtTime(200, now + 1.8);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 1.8);
    } catch {
      // Audio blocked or unsupported
    }
  }

  /**
   * Combined grand entrance audio trigger
   */
  public playGrandOpening() {
    this.playTempleBell();
    setTimeout(() => {
      this.playMagicalWhoosh();
    }, 150);
  }
}

export const doorSound = new DoorSoundSynthesizer();
