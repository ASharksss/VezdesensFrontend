import React, { useState, useRef, useEffect } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';


const ImageEditor = () => {
 const cropperRef = useRef(null)
 const [src, setSrc] = useState([]);
 const [changeImage, setChangeImage] = useState(null)
 const [cropp, setCropp] = useState(null)
 const [cropData, setCropData] = useState([]);

 const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    const croppedCanvas = cropper.getCroppedCanvas()
    const croppedDataUrl = croppedCanvas.toDataURL('image/jpeg');
    setCropp(croppedDataUrl);
 };

 const handleSetImage = (index) => {
    setChangeImage(src[index])
 }

 const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setSrc(prev => [...prev, reader.result]);
    };
    reader.readAsDataURL(file);
 };

 useEffect(() => {
    setCropData(prev => [...prev, cropp])
 }, [changeImage])

 return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {changeImage && (
        <Cropper
          ref={cropperRef}
          src={changeImage}
          style={{ height: 400, width: '100%' }}
          viewMode={1}
          dragMode="move"
          aspectRatio={1 / 1}
          crop={onCrop}
        />
      )}
      {src.length > 0 ? src.map((item, index) => <img src={item} onClick={() => handleSetImage(index)} width={'200px'} alt="cropped" />) : null}
      {cropData.length > 0 ? cropData.map((item, index) => <img src={item} alt="cropped" />) : null}
    </div>
 );
};

export default ImageEditor;