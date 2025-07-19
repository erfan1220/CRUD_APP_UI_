import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-images',
  imports: [CommonModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css',
})
export class ImagesComponent {
  @Output() fileChosen = new EventEmitter<File | null>();
  @Output() disable = new EventEmitter<boolean>();



  imagePreviews: string[] = [];
  imageFiles: File[] = [];
  mainImage: File | null = null;
  selectedImage: string = '';
  maxSizeKB: number = 30;
  isDisable = true;

  onFilesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;
    const maxSizeBytes = this.maxSizeKB * 1024;

    if (input.files && input.files.length > 0) {
      const newFiles = Array.from(input.files);

      const validFiles = newFiles.filter((file) => file.size <= maxSizeBytes);
      this.imageFiles = [
        ...this.imageFiles,
        ...validFiles.filter(
          (newFile) =>
            !this.imageFiles.some(
              (existing) =>
                existing.name === newFile.name && existing.size === newFile.size
            )
        ),
      ];

      newFiles.forEach((file) => {
        if (file.size > maxSizeBytes) {
          alert(`File "${file.name}" is too large (max ${this.maxSizeKB} KB).`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviews.push(e.target?.result);
          this.selectedImage =
            this.imagePreviews[this.imagePreviews.length - 1];
          this.mainImage = this.imageFiles[this.imageFiles.length - 1];
          // console.log(this.mainImage);
          // this.isDisable = false
          this.emitImage();
        };
        reader.readAsDataURL(file);
      });
    }
  }

  removeImage(index: number): void {
    this.imagePreviews.splice(index, 1);
    this.imageFiles.splice(index, 1);
    this.selectedImage = this.imagePreviews.at(-1) || '';
    this.mainImage = this.imageFiles.at(-1) || null;
    // this.isDisable = true
    this.emitImage();
    // console.log(this.mainImage);
  }

  selectImage(index: number) {
    this.selectedImage = this.imagePreviews[index];
    this.mainImage = this.imageFiles[index];
    // this.isDisable = false
    this.emitImage();
    // console.log(this.mainImage);
  }
  emitImage() {
    this.fileChosen.emit(this.mainImage);
    // console.log(this.isDisable);
    if (this.mainImage) {
      this.isDisable = false;
    } else {
      this.isDisable = true
    }
    this.disable.emit(this.isDisable)
  }
}
