import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import './ImageUpload.css';

const ImageUpload = ({ images = [], onChange, maxImages = 5, maxSizeMB = 2 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_SIZE = maxSizeMB * 1024 * 1024; // Convert MB to bytes
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];

  /**
   * Validate image file
   */
  const validateFile = (file) => {
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error(`Invalid file type. Allowed: JPG, PNG, WebP, GIF`);
    }

    // Check file size
    if (file.size > MAX_SIZE) {
      throw new Error(`File too large. Maximum size: ${maxSizeMB}MB`);
    }

    return true;
  };

  /**
   * Compress and convert image to Base64
   */
  const processImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const img = new Image();
        
        img.onload = () => {
          // Create canvas for compression
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          // Calculate new dimensions (max 1200px width)
          let width = img.width;
          let height = img.height;
          const maxWidth = 1200;
          
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          // Draw and compress
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to Base64 with compression (80% quality)
          const compressedBase64 = canvas.toDataURL('image/jpeg', 0.8);
          
          resolve({
            data: compressedBase64,
            name: file.name,
            size: file.size,
            type: file.type
          });
        };
        
        img.onerror = () => {
          reject(new Error('Failed to load image'));
        };
        
        img.src = e.target.result;
      };
      
      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };
      
      reader.readAsDataURL(file);
    });
  };

  /**
   * Handle file selection
   */
  const handleFiles = async (files) => {
    const fileArray = Array.from(files);
    
    // Check max images limit
    if (images.length + fileArray.length > maxImages) {
      toast.error(`Maximum ${maxImages} images allowed`);
      return;
    }

    setIsProcessing(true);
    const newImages = [];

    try {
      for (const file of fileArray) {
        try {
          // Validate file
          validateFile(file);
          
          // Process and compress image
          const processedImage = await processImage(file);
          newImages.push(processedImage);
          
        } catch (error) {
          toast.error(`${file.name}: ${error.message}`);
        }
      }

      if (newImages.length > 0) {
        onChange([...images, ...newImages]);
        toast.success(`${newImages.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      toast.error('Error processing images');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Handle drag events
   */
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
  };

  /**
   * Handle file input change
   */
  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFiles(files);
    }
    // Reset input
    e.target.value = '';
  };

  /**
   * Remove image
   */
  const handleRemove = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    toast.success('Image removed');
  };

  /**
   * Open file picker
   */
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="image-upload-container">
      {/* Upload Zone */}
      <div
        className={`image-upload-zone ${isDragging ? 'dragging' : ''} ${isProcessing ? 'processing' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          onChange={handleFileInput}
          style={{ display: 'none' }}
        />

        <div className="upload-zone-content">
          {isProcessing ? (
            <>
              <div className="upload-spinner"></div>
              <p className="upload-text">Processing images...</p>
            </>
          ) : (
            <>
              <Upload size={48} className="upload-icon" />
              <p className="upload-text">
                <strong>Drag & drop images here</strong> or click to browse
              </p>
              <p className="upload-hint">
                Supports: JPG, PNG, WebP, GIF (Max {maxSizeMB}MB per image)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="image-preview-section">
          <div className="preview-header">
            <span className="preview-label">
              <ImageIcon size={18} />
              Uploaded Images ({images.length}/{maxImages})
            </span>
          </div>

          <div className="image-preview-grid">
            {images.map((image, index) => (
              <div key={index} className="image-preview-item">
                <img
                  src={image.data || image}
                  alt={`Preview ${index + 1}`}
                  className="preview-image"
                />
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(index);
                  }}
                  title="Remove image"
                >
                  <X size={16} />
                </button>
                <div className="image-index">{index + 1}</div>
              </div>
            ))}

            {/* Add More Button */}
            {images.length < maxImages && (
              <div className="image-preview-item add-more" onClick={handleClick}>
                <Upload size={32} />
                <span>Add More</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Storage Warning */}
      {images.length >= maxImages && (
        <div className="upload-warning">
          <AlertCircle size={16} />
          <span>Maximum {maxImages} images reached</span>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
