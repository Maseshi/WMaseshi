import { useState } from 'react'

import { validURL } from '../../../../../utils/functions/validURL'
import { translator } from '../../../../../utils/functions/translator'

export default function Detail(props) {
    const [detailStatusSelection, setDetailStatusSelection] = useState("7")

    const pagesIDProps = props.pagesID

    const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/

    return (
        <>
            <div className="row g-3 mb-3">
                <div className="col-md">
                    <label htmlFor="newProjectName" className="form-label">
                        <i className="bi bi-tag"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.new_name_project} *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        minLength={2}
                        maxLength={20}
                        aria-describedby="newProjectNameValidate"
                        id="newProjectName"
                        placeholder="Text Editor"
                        required
                        onChange={
                            (event) => {
                                const projectID = event.target.value.toLowerCase().replace(' ', '-')
                                const validate = document.getElementById("newProjectNameValidate")

                                if (!event.target.value) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.name_is_empty
                                    event.target.classList.remove('is-valid')
                                    return event.target.classList.add('is-invalid')
                                }

                                if (format.test(event.target.value)) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.name_must_do_not_have_special_character
                                    event.target.classList.remove('is-valid')
                                    return event.target.classList.add('is-invalid')
                                }

                                if (event.target.value.length < event.target.minLength) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.name_too_short.replace('%s', event.target.minLength)
                                    event.target.classList.remove('is-valid')
                                    return event.target.classList.add('is-invalid')
                                }

                                if (event.target.value.length >= event.target.maxLength) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.name_too_long.replace('%s', event.target.maxLength)
                                    event.target.classList.remove('is-valid')
                                    return event.target.classList.add('is-invalid')
                                }

                                if (pagesIDProps.includes('new-project')) pagesIDProps.splice(pagesIDProps.indexOf('new-project'), 1)
                                if (pagesIDProps.includes(projectID)) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.name_is_duplicate
                                    event.target.classList.remove('is-valid')
                                    return event.target.classList.add('is-invalid')
                                }

                                event.target.classList.remove('is-invalid')
                                return event.target.classList.add('is-valid')
                            }
                        }
                    />
                    <div id="newProjectNameValidate" className="invalid-feedback"></div>
                </div>
                <div className="col-md">
                    <label htmlFor="newProjectType" className="form-label">
                        <i className="bi bi-cursor-text"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.type} *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        minLength={2}
                        maxLength={20}
                        aria-describedby="newProjectTypeValidate"
                        id="newProjectType"
                        placeholder={translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.application}
                        required
                        onChange={
                            (event) => {
                                const validate = document.getElementById("newProjectTypeValidate")

                                if (!event.target.value) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.type_is_empty
                                    return event.target.classList.add('is-invalid')
                                }

                                if (format.test(event.target.value)) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.type_must_do_not_have_special_character
                                    return event.target.classList.add('is-invalid')
                                }

                                if (event.target.value.length < event.target.minLength) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.type_too_short.replace('%s', event.target.minLength)
                                    return event.target.classList.add('is-invalid')
                                }

                                if (event.target.value.length >= event.target.maxLength) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.type_too_long.replace('%s', event.target.maxLength)
                                    return event.target.classList.add('is-invalid')
                                }

                                return event.target.classList.remove('is-invalid')
                            }
                        }
                    />
                    <div id="newProjectTypeValidate" className="invalid-feedback"></div>
                </div>
                <div className="col">
                    <label htmlFor="newProjectDate" className="form-label">
                        <i className="bi bi-123"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.create_on}
                    </label>
                    <div className="input-group">
                        <span className="input-group-text" id="newProjectDate"><i className="bi bi-calendar"></i></span>
                        <input type="date" className="form-control" placeholder="today" aria-label="today" aria-describedby="newProjectDate" />
                    </div>
                </div>
                <div className="col">
                    <label htmlFor="newProjectStatus" className="form-label">
                        <i className="bi bi-circle-square"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.status}
                    </label>
                    <div className="input-group">
                        <label className="input-group-text" htmlFor="newProjectStatus">
                            <i className="bi bi-dot"></i>
                        </label>
                        <select
                            className="form-select"
                            name="project-status"
                            value={detailStatusSelection}
                            id="newProjectStatus"
                            onChange={(event) => setDetailStatusSelection(event.target.value)}
                        >
                            <option value="0">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.test}</option>
                            <option value="1">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.closed}</option>
                            <option value="2">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.normal}</option>
                            <option value="3">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.error}</option>
                            <option value="4">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.problem}</option>
                            <option value="5">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.development}</option>
                            <option value="6">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.unknown}</option>
                            <option value="7">{translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.unspecified}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row g-3 mb-3">
                <div className="col">
                    <label htmlFor="newProjectTag" className="form-label">
                        <i className="bi bi-hash"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.tags}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="newProjectTag"
                        placeholder={
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.text
                            + ', ' +
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.tool
                        }
                    />
                </div>
                <div className="col-md">
                    <label htmlFor="newProjectButton" className="form-label">
                        <i className="bi bi-123"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button}
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-tag"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="newProjectButtonName"
                            minLength={2}
                            maxLength={10}
                            placeholder={translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.download}
                            aria-describedby="newProjectButtonValidate"
                            onChange={
                                (event) => {
                                    const buttonLink = document.getElementById("newProjectButtonLink")
                                    const validate = document.getElementById("newProjectButtonValidate")

                                    if (event.target.value) {
                                        if (format.test(event.target.value)) {
                                            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button_must_do_not_have_special_character
                                            return event.target.classList.add('is-invalid')
                                        }

                                        if (event.target.value.length < event.target.minLength) {
                                            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button_too_short.replace('%s', event.target.maxLength)
                                            return event.target.classList.add('is-invalid')
                                        }

                                        if (event.target.value.length >= event.target.maxLength) {
                                            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button_too_long.replace('%s', event.target.maxLength)
                                            return event.target.classList.add('is-invalid')
                                        }

                                        if (!buttonLink.value) {
                                            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button_link_is_empty
                                            return buttonLink.classList.add('is-invalid')
                                        }
                                    }

                                    return event.target.classList.remove('is-invalid')
                                }
                            }
                        />
                        <span className="input-group-text">
                            <i className="bi bi-link"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            id="newProjectButtonLink"
                            placeholder="https://github.com/Maseshi/Example/releases/download/1.0.0/example.zip"
                            aria-label="https://github.com/Maseshi/Example/releases/download/1.0.0/example.zip"
                            aria-describedby="newProjectButtonValidate"
                            onChange={
                                (event) => {
                                    const buttonName = document.getElementById("newProjectButtonName")
                                    const validate = document.getElementById("newProjectButtonValidate")

                                    if (event.target.value) {
                                        if (!validURL(event.target.value)) {
                                            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button_link_address_is_invalid
                                            return event.target.classList.add('is-invalid')
                                        }

                                        if (!buttonName.value) {
                                            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button_name_is_empty
                                            return buttonName.classList.add('is-invalid')
                                        }
                                    }

                                    return event.target.classList.remove('is-invalid')
                                }
                            }
                        />
                        <div id="newProjectButtonValidate" className="invalid-feedback"></div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="newProjectLink" className="form-label">
                    <i className="bi bi-link"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.link}
                </label>
                <input
                    type="url"
                    className="form-control"
                    aria-describedby="newProjectLinkValidate"
                    id="newProjectLink"
                    placeholder="https://maseshi.web.app/"
                    onChange={
                        (event) => {
                            const validate = document.getElementById("newProjectLinkValidate")

                            if (event.target.value && !validURL(event.target.value)) {
                                validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.link_address_is_invalid
                                return event.target.classList.add('is-invalid')
                            }

                            return event.target.classList.remove('is-invalid')
                        }
                    }
                />
                <div id="newProjectLinkValidate" className="invalid-feedback"></div>
            </div>
            <div className="row g-3">
                <div className="col">
                    <label htmlFor="newProjectDescription" className="form-label">
                        <i className="bi bi-card-text"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.description} *
                    </label>
                    <textarea
                        className="form-control"
                        minLength={2}
                        maxLength={150}
                        aria-describedby="newProjectDescriptionValidate"
                        id="newProjectDescription"
                        placeholder="เครื่องมือสำหรับแก้ไขข้อความ"
                        rows="3"
                        required
                        onChange={
                            (event) => {
                                const validate = document.getElementById("newProjectDescriptionValidate")

                                if (!event.target.value) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.description_is_empty
                                    return event.target.classList.add('is-invalid')
                                }

                                if (event.target.value.length < event.target.minLength) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.description_too_short.replace('%s', event.target.maxLength)
                                    return event.target.classList.add('is-invalid')
                                }

                                if (event.target.value.length >= event.target.maxLength) {
                                    validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.description_too_long.replace('%s', event.target.maxLength)
                                    return event.target.classList.add('is-invalid')
                                }

                                return event.target.classList.remove('is-invalid')
                            }
                        }
                    >
                    </textarea>
                    <div id="newProjectDescriptionValidate" className="invalid-feedback"></div>
                </div>
            </div>
        </>
    )
}
