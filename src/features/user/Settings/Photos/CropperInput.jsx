import "cropperjs/dist/cropper.css";
import Cropper from "react-cropper";
import React, { Component, createRef } from "react";

class CropperInput extends Component {
   cropper = createRef();

   cropImage = () => {
      const { setImage } = this.props;

      if (typeof this.cropper.current.getCroppedCanvas() === "undefined") {
         return;
      }

      this.cropper.current.getCroppedCanvas().toBlob((blob) => {
         setImage(blob);
      }, "image/jpeg");
   };

   render() {
      const { imagePreview } = this.props;

      return (
         <Cropper
            aspectRatio={1}
            crop={this.cropImage}
            cropBoxMovable={true}
            cropBoxResizable={true}
            dragMode='move'
            guides={false}
            preview='.img-preview'
            ref={this.cropper}
            scalable={true}
            src={imagePreview}
            style={{ height: 200, width: "100%" }}
            viewMode={1}
         />
      );
   }
}

export default CropperInput;
