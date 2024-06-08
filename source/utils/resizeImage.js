export function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                let newWidth = img.width;
                let newHeight = img.height;

                if (img.width > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = (img.height * maxWidth) / img.width;
                }

                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = (img.width * maxHeight) / img.height;
                }

                canvas.width = newWidth;
                canvas.height = newHeight;

                ctx.drawImage(img, 0, 0, newWidth, newHeight);

                const resizedDataUrl = canvas.toDataURL('image/jpeg'); // Change to 'image/png' if needed

                resolve(resizedDataUrl);
            };
        };

        reader.onerror = function (error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}
