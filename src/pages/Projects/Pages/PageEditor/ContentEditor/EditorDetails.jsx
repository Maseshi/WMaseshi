import { useEffect, useState } from 'react'

import { validURL } from '../../../../../utils/functions/validURL'
import { translator } from '../../../../../utils/functions/translator'

export default function Detail({ data, pages }) {
    const [detailName, setDetailName] = useState('')
    const [detailType, setDetailType] = useState('')
    const [detailStatus, setDetailStatus] = useState('7')
    const [detailEstablished, setDetailEstablished] = useState('')
    const [detailTags, setDetailTags] = useState('')
    const [detailButtonName, setDetailButtonName] = useState('')
    const [detailButtonLink, setDetailButtonLink] = useState('')
    const [detailLink, setDetailLink] = useState('')
    const [detailDescription, setDetailDescription] = useState('')
    const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/

    useEffect(() => {
        if (data) {
            if (data.title) setDetailName(data.title)
            if (data.type) setDetailType(data.type)
            if (data.status) setDetailStatus(data.status)
            if (data.established) setDetailEstablished(new Date((data.established.seconds || data.established) * 1000).toISOString().slice(0, 10))
            if (data.tag) setDetailTags(data.tag.join(','))
            if (data.button) {
                if (data.button[0].name) setDetailButtonName(data.button[0].name)
                if (data.button[0].link) setDetailButtonLink(data.button[0].link)
            }
            if (data.link) setDetailLink(data.link)
            if (data.description) setDetailDescription(data.description)
        }
    }, [data])

    const handleNameValidate = (event) => {
        const projectID = event.target.value.toLowerCase().replace(' ', '-')
        const validate = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "NameValidate")

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

        if (pages.includes('new-project')) pages.splice(pages.indexOf('new-project'), 1)
        if (pages.includes(projectID)) {
            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.name_is_duplicate
            event.target.classList.remove('is-valid')
            return event.target.classList.add('is-invalid')
        }

        setDetailName(event.target.value)

        event.target.classList.remove('is-invalid')
        return event.target.classList.add('is-valid')
    }
    const handleTypeValidate = (event) => {
        const validate = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "TypeValidate")

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

        setDetailType(event.target.value)

        return event.target.classList.remove('is-invalid')
    }
    const handleButtonNameValidate = (event) => {
        const buttonLink = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "ButtonLink")
        const validate = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "ButtonValidate")

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

        setDetailButtonName(event.target.value)

        return event.target.classList.remove('is-invalid')
    }
    const handleButtonLinkValidate = (event) => {
        const buttonName = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "ButtonName")
        const validate = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "ButtonValidate")

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

        setDetailButtonLink(event.target.value)

        return event.target.classList.remove('is-invalid')
    }
    const handleLinkValidate = (event) => {
        const validate = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "LinkValidate")

        if (event.target.value && !validURL(event.target.value)) {
            validate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.link_address_is_invalid
            return event.target.classList.add('is-invalid')
        }

        setDetailLink(event.target.value)

        return event.target.classList.remove('is-invalid')
    }
    const handleDescriptionValidate = (event) => {
        const validate = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "DescriptionValidate")

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

        setDetailDescription(event.target.value)

        return event.target.classList.remove('is-invalid')
    }

    return (
        <>
            <div className="row g-3 mb-3">
                <div className="col-md">
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Name'
                            ) : (
                                'editorProjectName'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-tag"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.new_name_project} *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        minLength={2}
                        maxLength={20}
                        aria-describedby={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'NameValidate'
                            ) : (
                                'editorProjectNameValidate'
                            )
                        }
                        value={detailName}
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Name'
                            ) : (
                                'editorProjectName'
                            )
                        }
                        placeholder="Text Editor"
                        required
                        onChange={(event) => handleNameValidate(event)}
                    />
                    <div
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'NameValidate'
                            ) : (
                                'editorProjectNameValidate'
                            )
                        }
                        className="invalid-feedback"
                    >

                    </div>
                </div>
                <div className="col-md">
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Type'
                            ) : (
                                'editorProjectType'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-cursor-text"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.type} *
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        minLength={2}
                        maxLength={20}
                        aria-describedby={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'TypeValidate'
                            ) : (
                                'editorProjectTypeValidate'
                            )
                        }
                        value={detailType}
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Type'
                            ) : (
                                'editorProjectType'
                            )
                        }
                        placeholder={translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.application}
                        required
                        onChange={(event) => handleTypeValidate(event)}
                    />
                    <div
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'TypeValidate'
                            ) : (
                                'editorProjectTypeValidate'
                            )
                        }
                        className="invalid-feedback"
                    >

                    </div>
                </div>
                <div className="col">
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Date'
                            ) : (
                                'editorProjectDate'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-123"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.create_on}
                    </label>
                    <div className="input-group">
                        <span className="input-group-text"><i className="bi bi-calendar"></i></span>
                        <input
                            type="date"
                            className="form-control"
                            placeholder="today"
                            aria-label="today"
                            value={detailEstablished}
                            id={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'Date'
                                ) : (
                                    'editorProjectDate'
                                )
                            }
                            onChange={(event) => setDetailEstablished(event.target.value)}
                        />
                    </div>
                </div>
                <div className="col">
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Status'
                            ) : (
                                'editorProjectStatus'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-circle-square"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.status}
                    </label>
                    <div className="input-group">
                        <label
                            className="input-group-text"
                            htmlFor={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'Status'
                                ) : (
                                    'editorProjectStatus'
                                )
                            }
                        >
                            <i className="bi bi-dot"></i>
                        </label>
                        <select
                            className="form-select"
                            name="project-status"
                            value={detailStatus}
                            id={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'Status'
                                ) : (
                                    'editorProjectStatus'
                                )
                            }
                            onChange={(event) => setDetailStatus(event.target.value)}
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
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Tag'
                            ) : (
                                'editorProjectTag'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-hash"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.tags}
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={detailTags}
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Tag'
                            ) : (
                                'editorProjectTag'
                            )
                        }
                        placeholder={
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.text
                            + ', ' +
                            translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.tool
                        }
                        onChange={(event) => setDetailTags(event.target.value)}
                    />
                </div>
                <div className="col-md">
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Button'
                            ) : (
                                'editorProjectButton'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-123"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.button}
                    </label>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-tag"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={detailButtonName}
                            id={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'ButtonName'
                                ) : (
                                    'editorProjectButtonName'
                                )
                            }
                            minLength={2}
                            maxLength={10}
                            placeholder={translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.download}
                            aria-describedby={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'ButtonValidate'
                                ) : (
                                    'editorProjectButtonValidate'
                                )
                            }
                            onChange={(event) => handleButtonNameValidate(event)}
                        />
                        <span className="input-group-text">
                            <i className="bi bi-link"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            value={detailButtonLink}
                            id={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'ButtonLink'
                                ) : (
                                    'editorProjectButtonLink'
                                )
                            }
                            placeholder="https://github.com/Maseshi/Example/releases/download/1.0.0/example.zip"
                            aria-label="https://github.com/Maseshi/Example/releases/download/1.0.0/example.zip"
                            aria-describedby="editorProjectButtonValidate"
                            onChange={(event) => handleButtonLinkValidate(event)}
                        />
                        <div
                            id={
                                data ? (
                                    'editorProject' + data.title.replace(' ', '') + 'ButtonValidate'
                                ) : (
                                    'editorProjectButtonValidate'
                                )
                            }
                            className="invalid-feedback"
                        >

                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3">
                <label
                    htmlFor={
                        data ? (
                            'editorProject' + data.title.replace(' ', '') + 'Link'
                        ) : (
                            'editorProjectLink'
                        )
                    }
                    className="form-label"
                >
                    <i className="bi bi-link"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.link}
                </label>
                <input
                    type="url"
                    className="form-control"
                    aria-describedby={
                        data ? (
                            'editorProject' + data.title.replace(' ', '') + 'LinkValidate'
                        ) : (
                            'editorProjectLinkValidate'
                        )
                    }
                    value={detailLink}
                    id={
                        data ? (
                            'editorProject' + data.title.replace(' ', '') + 'Link'
                        ) : (
                            'editorProjectLink'
                        )
                    }
                    placeholder="https://maseshi.web.app/"
                    onChange={(event) => handleLinkValidate(event)}
                />
                <div
                    id={
                        data ? (
                            'editorProject' + data.title.replace(' ', '') + 'LinkValidate'
                        ) : (
                            'editorProjectLinkValidate'
                        )
                    }
                    className="invalid-feedback"
                >

                </div>
            </div>
            <div className="row g-3">
                <div className="col">
                    <label
                        htmlFor={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Description'
                            ) : (
                                'editorProjectDescription'
                            )
                        }
                        className="form-label"
                    >
                        <i className="bi bi-card-text"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.description} *
                    </label>
                    <textarea
                        className="form-control"
                        minLength={2}
                        maxLength={1500}
                        aria-describedby={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'DescriptionValidate'
                            ) : (
                                'editorProjectDescriptionValidate'
                            )
                        }
                        value={detailDescription}
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'Description'
                            ) : (
                                'editorProjectDescription'
                            )
                        }
                        placeholder={translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.Details.text_editing_tool}
                        rows="3"
                        required
                        onChange={(event) => handleDescriptionValidate(event)}
                    >
                    </textarea>
                    <div
                        id={
                            data ? (
                                'editorProject' + data.title.replace(' ', '') + 'DescriptionValidate'
                            ) : (
                                'editorProjectDescriptionValidate'
                            )
                        }
                        className="invalid-feedback"
                    >

                    </div>
                </div>
            </div>
        </>
    )
}
