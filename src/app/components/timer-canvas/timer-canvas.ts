/* eslint-disable unicorn/no-null */
/* eslint-disable unicorn/consistent-function-scoping */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { TodoStore } from '../../store/todo-store';
import { convertTimeToSeconds } from '../../utils/convert-time-to-sec';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-timer-canvas',
  imports: [NgClass],
  templateUrl: './timer-canvas.html',
  styleUrl: './timer-canvas.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerCanvas implements AfterViewInit {
  readonly store = inject(TodoStore);

  private selectedTodo = this.store.selectedTodo;
  private previousTodoId: string | null = null;

  constructor() {
    effect(() => {
      const todo = this.selectedTodo();
      if (todo) {
        const currentTodoId = todo.idTodo;

        if (this.previousTodoId !== currentTodoId) {
          this.previousTodoId = currentTodoId;
          this.resetTimerOnTodoChange();
        }
      } else {
        this.previousTodoId = null;
      }
    });
  }

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  // canvas
  public widthCanvas = signal(400);
  public heightCanvas = signal(400);

  @ViewChild('timerCanvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  private ctx!: CanvasRenderingContext2D;

  // server
  private serverTimer = this.store.timerPomodoro;
  private serverRestTimerInterval = this.store.timerRestPomodoro;
  private serverPomodoroComplete = signal(
    this.selectedTodo()?.pomodoroValueComplete
  );

  // local
  public isRunning = signal(false);
  public isFocusTimer = signal(true);
  public isRestTimer = signal(false);

  private centerX = computed(() => this.widthCanvas() / 2);
  private centerY = computed(() => this.heightCanvas() / 2);
  private radius = computed(() => this.widthCanvas() / 2 - 10);

  private animationId: number | null = null;

  private totalSeconds = computed(() =>
    this.isFocusTimer()
      ? convertTimeToSeconds(this.serverTimer())
      : convertTimeToSeconds(this.serverRestTimerInterval())
  );

  private remainingSeconds = signal(this.totalSeconds());
  private startTime: number | null = null;
  private expectedRemaining: number = this.totalSeconds();

  private elapsedPercent = computed(() => {
    return (
      (this.totalSeconds() - this.remainingSeconds()) / this.totalSeconds()
    );
  });

  private progressDegrees = computed(() => this.elapsedPercent() * 360);

  private localTimer = computed(() => {
    const totalSeconds = this.remainingSeconds();
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.ceil(totalSeconds % 60);

    if (seconds === 60) {
      return `${(minutes + 1).toString().padStart(2, '0')}:00`;
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  });

  public selectedTodoIsComplete = computed(
    () => this.selectedTodo()?.isComplete ?? false
  );

  public startHandler(): void {
    if (!this.isRunning() && this.remainingSeconds() > 0) {
      this.isRunning.set(true);
      this.startTime = Date.now();
      this.expectedRemaining = this.remainingSeconds();
      this.animationId = requestAnimationFrame(this.animate);
    }
  }

  public resetTimer(type: 'focus' | 'rest'): void {
    if (type === 'focus') {
      this.switchTimer('focus');
    } else {
      this.stopHandler();
      this.remainingSeconds.set(this.totalSeconds());
      this.expectedRemaining = this.totalSeconds();
      this.drawProgressScale();
    }
  }

  public switchTimer(type: 'focus' | 'rest'): void {
    this.stopHandler();

    if (type === 'focus') {
      this.isFocusTimer.set(true);
      this.isRestTimer.set(false);
    } else {
      this.isFocusTimer.set(false);
      this.isRestTimer.set(true);
    }

    this.remainingSeconds.set(this.totalSeconds());
    this.expectedRemaining = this.totalSeconds();
    this.drawProgressScale();
  }

  public stopHandler(): void {
    if (this.isRunning()) {
      this.isRunning.set(false);

      if (this.animationId !== null) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }

      this.expectedRemaining = this.remainingSeconds();
      this.startTime = null;
      this.drawProgressScale();
    }
  }

  private resetTimerOnTodoChange(): void {
    if (!this.ctx) return;

    this.stopHandler();

    this.isRunning.set(false);
    this.isFocusTimer.set(true);
    this.isRestTimer.set(false);

    this.serverPomodoroComplete.set(this.selectedTodo()?.pomodoroValueComplete);

    this.remainingSeconds.set(this.totalSeconds());
    this.expectedRemaining = this.totalSeconds();

    this.drawProgressScale();
  }

  private initCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Canvas 2D context is not supported');
    }

    this.ctx = context;
    this.drawProgressScale();
  }

  private drawProgressScale(): void {
    this.clearCanvas();

    const progressRadians = (this.progressDegrees() * Math.PI) / 180;
    const startAngle = -Math.PI / 2;

    const gradient = this.ctx.createConicGradient(
      startAngle,
      this.centerX(),
      this.centerY()
    );

    if (this.isFocusTimer()) {
      gradient.addColorStop(0, 'hsla(0, 100%, 50%, 0.3)');
      gradient.addColorStop(0.25, 'hsla(0, 100%, 50%, 0.6)');
      gradient.addColorStop(0.5, 'hsla(0, 100%, 50%, 0.8)');
      gradient.addColorStop(0.75, 'hsla(0, 100%, 50%, 0.9)');
      gradient.addColorStop(1, 'hsla(0, 100%, 50%, 1)');
    } else {
      gradient.addColorStop(0, 'rgba(62, 135, 243, 0.3)');
      gradient.addColorStop(0.25, 'rgba(62, 135, 243, 0.6)');
      gradient.addColorStop(0.5, 'rgba(62, 135, 243, 0.8)');
      gradient.addColorStop(0.75, 'rgba(62, 135, 243, 0.9)');
      gradient.addColorStop(1, 'rgba(62, 135, 243, 1)');
    }

    this.ctx.beginPath();
    this.ctx.arc(
      this.centerX(),
      this.centerY(),
      this.radius() - 14,
      startAngle,
      startAngle + progressRadians
    );

    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 20;
    this.ctx.stroke();

    this.drawSecondsBrigs();
    this.drawTimerText();
    this.drawArrow();
  }

  private animate = () => {
    if (!this.startTime) return;
    const elapsedSeconds = (Date.now() - this.startTime) / 1000;

    this.remainingSeconds.set(
      Math.max(0, this.expectedRemaining - elapsedSeconds)
    );

    this.drawProgressScale();

    if (this.isRunning() && this.remainingSeconds() > 0) {
      this.animationId = requestAnimationFrame(this.animate);
    } else {
      this.isRunning.set(false);
      this.startTime = null;

      if (this.isFocusTimer()) {
        this.switchTimer('rest');

        const selectedTodo = this.selectedTodo();

        if (selectedTodo) {
          this.store.increasePomodoroValueComplete(
            selectedTodo.idTodo,
            selectedTodo.pomodoroValueComplete + 1
          );

          this.store.increaseTimeSpent(selectedTodo.idTodo);
        }
      } else {
        this.switchTimer('focus');
      }
    }
  };

  private clearCanvas(): void {
    this.ctx.clearRect(0, 0, this.widthCanvas(), this.heightCanvas());
  }

  private drawTimerText(): void {
    this.ctx.fillStyle = '#000000';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(this.localTimer(), this.centerX(), this.centerY());
  }

  private drawSecondsBrigs(): void {
    for (let i = 0; i < 60; i++) {
      const angle = (i * 6 - 90) * (Math.PI / 180);
      const isMajor = i % 5 === 0;

      this.ctx.beginPath();
      const startRadius = isMajor ? this.radius() - 15 : this.radius() - 10;
      const endRadius = this.radius() - 5;

      this.ctx.moveTo(
        this.centerX() + startRadius * Math.cos(angle),
        this.centerY() + startRadius * Math.sin(angle)
      );

      this.ctx.lineTo(
        this.centerX() + endRadius * Math.cos(angle),
        this.centerY() + endRadius * Math.sin(angle)
      );

      this.ctx.strokeStyle = isMajor ? '#333' : '#666';
      this.ctx.lineWidth = isMajor ? 3 : 2;
      this.ctx.stroke();
    }
  }

  private drawArrow(): void {
    const angle = -Math.PI / 2 + (this.progressDegrees() * Math.PI) / 180;
    const handLength = this.radius() - 8;

    this.ctx.save();
    this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    this.ctx.shadowBlur = 5;
    this.ctx.shadowOffsetX = 2;
    this.ctx.shadowOffsetY = 2;

    const gradient = this.ctx.createLinearGradient(
      this.centerX(),
      this.centerY(),
      this.centerX() + handLength * Math.cos(angle),
      this.centerY() + handLength * Math.sin(angle)
    );

    if (this.isFocusTimer()) {
      gradient.addColorStop(0, 'rgba(255, 68, 68, 0)');
      gradient.addColorStop(0.1, 'rgba(255, 68, 68, 0.1)');
      gradient.addColorStop(0.3, 'rgba(255, 68, 68, 0.3)');
      gradient.addColorStop(0.5, 'rgba(255, 68, 68, 0.5)');
      gradient.addColorStop(0.7, 'rgba(255, 34, 34, 0.7)');
      gradient.addColorStop(1, 'rgba(255, 0, 0, 1)');
    } else {
      gradient.addColorStop(0, 'rgba(62, 135, 243, 0)');
      gradient.addColorStop(0.1, 'rgba(62, 135, 243, 0.1)');
      gradient.addColorStop(0.3, 'rgba(62, 135, 243, 0.3)');
      gradient.addColorStop(0.5, 'rgba(62, 135, 243, 0.5)');
      gradient.addColorStop(0.7, 'rgba(62, 135, 243, 0.6)');
      gradient.addColorStop(1, 'rgba(62, 135, 243, 1)');
    }

    const outerX = this.centerX() + handLength * Math.cos(angle);
    const outerY = this.centerY() + handLength * Math.sin(angle);
    const innerX = this.centerX() + (handLength / 1.4) * Math.cos(angle);
    const innerY = this.centerY() + (handLength / 1.4) * Math.sin(angle);

    this.ctx.beginPath();
    this.ctx.moveTo(outerX, outerY);
    this.ctx.lineTo(innerX, innerY);
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.stroke();
    this.ctx.restore();
  }

  getPomoClass(index: number): string {
    const completed = this.serverPomodoroComplete()!;
    let classes = 'spanPomo';
    if (index < completed) {
      classes += ' spanPomo_active';
    }
    return classes;
  }
}
