export const compressImage = async (file: File, maxWidth: number = 800, quality: number = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const compressedFile = new File([blob!], file.name, {
          type: file.type,
          lastModified: Date.now(),
        });
        resolve(compressedFile);
      }, file.type, quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

export const generateImageThumbnail = (file: File, size: number = 200): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      
      const scale = Math.max(size / img.width, size / img.height);
      const x = (size - img.width * scale) / 2;
      const y = (size - img.height * scale) / 2;
      
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      resolve(canvas.toDataURL());
    };
    
    img.src = URL.createObjectURL(file);
  });
};