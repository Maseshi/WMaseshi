import { useState } from 'react'

import { resizeImage } from '../../../../../utils/functions/resizeImage'
import { translator } from '../../../../../utils/functions/translator'

export default function UploadIcon() {
    const [photoURL, setPhotoURL] = useState()

    return (
        <div className="projects-new-upload-icon text-center mb-3">
            <input
                type="file"
                accept="image/*"
                id="newProjectUploadIcon"
                hidden
                onChange={
                    async (event) => {
                        const resizedImage = await resizeImage({
                            "file": event.target.files[0],
                            "maxSize": 200
                        });

                        setPhotoURL(URL.createObjectURL(resizedImage))
                    }
                }
            />
            <label htmlFor="newProjectUploadIcon" style={photoURL ? { padding: 0 } : null}>
                {
                    photoURL ? (
                        <img src={photoURL} alt="preview" width="120px" height="120px" />
                    ) : (
                        <i className="bi bi-plus"></i>
                    )
                }
            </label>
            {
                photoURL ? (
                    <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={
                            () => {
                                const uploadIcon = document.getElementById("newProjectUploadIcon")

                                uploadIcon.value = ''
                                setPhotoURL()
                            }
                        }
                    >
                        {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.UploadIcon.remove_icon}
                    </button>
                ) : ''
            }
            <div className="form-text mt-3">
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.UploadIcon.maximum_size}
                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.UploadIcon.automatic_resized}
            </div>
        </div>
    )
}
