import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core";
@Component({
  selector: 'SpreadCanvas',
  template: `<canvas style="display: block;position: fixed;top: 0;left: 0;" id="walkercanvas" #canvas></canvas>`,
  styleUrls: ['./SpreadCanvas.css']
})

export class SpreadCanvas {


  constructor() {

  }

  ngAfterViewInit(): void {
    this.setupCanvas();
    requestAnimationFrame(() => this.draw());
  }


  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private walkers: Walker[] = [];

  // private readonly colors: string[] = [
  //   'rgba(255, 0, 126, .1)',
  //   'rgba(144, 163, 175, 0.1)',
  //   'rgba(255, 165, 20, .1)'
  // ];

  private readonly colors: string[] = [
    'rgba(200, 16, 46, 0.1)',
    'rgba(140, 160, 190, 0.1)',
    'rgba(171, 152, 157, 0.1)'
  ];

//   private setupCanvas(): void {
//   const canvas = this.canvasRef.nativeElement;
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   this.ctx = canvas.getContext('2d')!;
//   this.ctx.lineWidth = 3;

//   this.walkers = []; // Clear previous walkers

//   const half = 250;
//   for (let i = 0; i < half; i++) {
//     const color = this.colors[this.rand(this.colors.length)];
//     this.walkers.push(new Walker(0, 0, color)); // Top-left
//   }

//   for (let i = 0; i < half; i++) {
//     const color = this.colors[this.rand(this.colors.length)];
//     this.walkers.push(new Walker(canvas.width, canvas.height, color)); // Bottom-right
//   }
// }


  private setupCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.lineWidth = 3;

    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);

    for (let i = 0; i < 500; i++) {
      const color = this.colors[this.rand(this.colors.length)];
      this.walkers.push(new Walker(centerX, centerY, color));
    }
  }

  private draw(): void {
    for (const walker of this.walkers) {
      this.drawEach(walker);
    }
    requestAnimationFrame(() => this.draw());
  }

  private drawEach(walker: Walker): void {
    let { x, y } = walker;
    switch (this.rand(4)) {
      case 0: if (x < this.canvasRef.nativeElement.width) x += 5; break;
      case 1: if (x > 0) x -= 5; break;
      case 2: if (y < this.canvasRef.nativeElement.height) y += 5; break;
      case 3: if (y > 0) y -= 5; break;
    }
    this.ctx.strokeStyle = walker.color;
    this.ctx.beginPath();
    this.ctx.moveTo(walker.x, walker.y);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    walker.update(x, y);
  }

  private rand(max: number): number {
    return Math.floor(Math.random() * max);
  }

  // @HostListener('window:resize')
  // onResize() {
  //   this.walkers = [];
  //   this.setupCanvas();
  // }




}



class Walker {
  constructor(public x: number, public y: number, public color: string) { }
  update(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }
}
