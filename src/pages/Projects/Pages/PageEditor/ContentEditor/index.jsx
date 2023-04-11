import { useState } from 'react'
import { getFirestore, doc, setDoc, deleteDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

import ContentTabs from '../../PageContents/ContentTabs/index'
import ContentDetail from '../../PageContents/ContentDetail'
import EditorIcon from './EditorIcon'
import EditorDetails from './EditorDetails'
import GetStart from './EditorTabs/GetStart'
import News from './EditorTabs/News'
import Documents from './EditorTabs/Documents'
import Changelog from './EditorTabs/Changelog'
import SourceCode from './EditorTabs/SourceCode'

import { resizeImage } from '../../../../../utils/functions/resizeImage'
import { validURL } from '../../../../../utils/functions/validURL'
import { translator } from '../../../../../utils/functions/translator'

export default function ContentEditor({ data, userData, parameter, pages }) {
    const [previewData, setPreviewData] = useState()
    const [previewMode, setPreviewMode] = useState(false)
    const [clearData, setClearData] = useState(false)
    const newsData = []

    const checkInput = () => {
        const projectName = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Name')
        const projectNameValidate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'NameValidate')
        const projectType = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Type')
        const projectTypeValidate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'TypeValidate')
        const projectDate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Date')
        const projectStatus = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Status')
        const projectTag = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Tag')
        const projectButtonName = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'ButtonName')
        const projectButtonLink = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'ButtonLink')
        const projectButtonValidate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'ButtonValidate')
        const projectLink = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Link')
        const projectLinkValidate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'LinkValidate')
        const projectDescription = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Description')
        const projectDescriptionValidate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'DescriptionValidate')

        const getStartTab = document.querySelector('input[name="getStartTab' + (data ? data.title.replace(' ', '') : '') + '"]:checked')
        const getStartTabInputGithub = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'InputGithub')
        const getStartTabInputHuggingface = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'InputHuggingface')
        const getStartTabHost = document.querySelector('input[name="getStartTab' + (data ? data.title.replace(' ', '') : '') + 'Host"]:checked')
        const getStartTabInputTypeHostTrue = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'InputTypeHostTrue')
        const getStartTabInputLinkHostTrue = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'InputLinkHostTrue')

        const changelogTab = document.querySelector('input[name="changelogTab' + (data ? data.title.replace(' ', '') : '') + '"]:checked')
        const changelogTabInputGithub = document.getElementById('changelogTab' + (data ? data.title.replace(' ', '') : '') + 'InputGithub')

        const sourceCodeTab = document.querySelector('input[name="sourceCodeTab' + (data ? data.title.replace(' ', '') : '') + '"]:checked')
        const sourceCodeTabInputGithub = document.getElementById('sourceCodeTab' + (data ? data.title.replace(' ', '') : '') + 'InputGithub')

        const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/

        // Verify the project name and convert it to project ID.
        if (!projectName.value) {
            projectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_is_empty
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        if (format.test(projectName.value)) {
            projectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_must_do_not_have_special_character
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        if (projectName.value.length < projectName.minLength) {
            projectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_too_short.replace('%s', projectName.minLength)
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        if (projectName.value.length >= projectName.maxLength) {
            projectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_too_long.replace('%s', projectName.maxLength)
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        const projectID = projectName.value.toLowerCase().replace(' ', '-')

        if (pages.includes('new-project')) pages.splice(pages.indexOf('new-project'), 1)
        if (!data) {
            if (pages.includes(projectID)) {
                projectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_is_duplicate
                projectName.classList.add('is-invalid')
                return false
            }
        }

        // Verify the project type
        if (!projectType.value) {
            projectTypeValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.type_is_empty
            projectType.classList.add('is-invalid')
            return false
        }

        if (format.test(projectType.value)) {
            projectTypeValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.type_must_do_not_have_special_character
            projectType.classList.add('is-invalid')
            return false
        }

        if (projectType.value.length < projectType.minLength) {
            projectTypeValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.type_too_short.replace('%s', projectType.minLength)
            projectType.classList.add('is-invalid')
            return false
        }

        if (projectType.value.length >= projectType.maxLength) {
            projectTypeValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.type_too_long.replace('%s', projectType.maxLength)
            projectType.classList.add('is-invalid')
            return false
        }

        // Split tags into arrays
        let tags = projectTag.value.split(',')

        // Verify the project button
        if (projectButtonName.value) {
            if (format.test(projectButtonName.value)) {
                projectButtonValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.button_must_do_not_have_special_character
                projectButtonName.classList.add('is-invalid')
                return false
            }

            if (projectButtonName.value.length < projectButtonName.minLength) {
                projectButtonValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.button_too_short.replace('%s', projectButtonName.maxLength)
                projectButtonName.classList.add('is-invalid')
                return false
            }

            if (projectButtonName.value.length >= projectButtonName.maxLength) {
                projectButtonValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.button_too_long.replace('%s', projectButtonName.maxLength)
                projectButtonName.classList.add('is-invalid')
                return false
            }

            if (!projectButtonLink.value) {
                projectButtonValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.button_link_is_empty
                projectButtonLink.classList.add('is-invalid')
                return false
            }
        }

        if (projectButtonLink.value) {
            if (!validURL(projectButtonLink.value)) {
                projectButtonValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.button_link_address_is_invalid
                projectButtonLink.classList.add('is-invalid')
                return false
            }

            if (!projectButtonName.value) {
                projectButtonValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.button_name_is_empty
                return projectButtonName.classList.add('is-invalid')
            }
        }

        // Verify the project link
        if (projectLink.value && !validURL(projectLink.value)) {
            projectLinkValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.link_address_is_invalid
            projectLink.classList.add('is-invalid')
            return false
        }

        // Verify the project description
        if (!projectDescription.value) {
            projectDescriptionValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.description_is_empty
            projectDescription.classList.add('is-invalid')
            return false
        }

        if (projectDescription.value.length < projectDescription.minLength) {
            projectDescriptionValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.description_too_short.replace('%s', projectDescription.maxLength)
            projectDescription.classList.add('is-invalid')
            return false
        }

        if (projectDescription.value.length >= projectDescription.maxLength) {
            projectDescriptionValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.description_too_long.replace('%s', projectDescription.maxLength)
            projectDescription.classList.add('is-invalid')
            return false
        }

        return {
            title: projectName.value,
            type: projectType.value,
            established: projectDate.value ? new Date(projectDate.value) : '',
            status: projectStatus.value ? Number(projectStatus.value) : 7,
            tag: projectType.value ? tags : '',
            button: projectButtonName.value || projectButtonLink.value ? (
                [
                    {
                        color: 0,
                        disabled: false,
                        link: projectButtonLink.value ? projectButtonLink.value : '',
                        name: projectButtonName.value ? projectButtonName.value : ''
                    }
                ]
            ) : '',
            link: projectLink.value ? [projectLink.value] : [],
            description: projectDescription.value,
            tab: {
                changelog: {
                    type: changelogTab.value ? changelogTab.value : 'none',
                    content: changelogTab.value === 'github' ? changelogTabInputGithub.value : ''
                },
                document: '',
                news: newsData,
                source_code: {
                    type: sourceCodeTab.value ? sourceCodeTab.value : 'none',
                    content: sourceCodeTab.value === 'github' ? sourceCodeTabInputGithub.value : ''
                },
                get_start: {
                    type: getStartTab ? getStartTab.value : 'none',
                    host: {
                        enable: getStartTabHost.value ? (getStartTabHost.value === "true") : false,
                        type: getStartTabInputTypeHostTrue && getStartTabInputTypeHostTrue.value ? getStartTabInputTypeHostTrue.value : '',
                        repo_model: getStartTabInputLinkHostTrue && getStartTabInputLinkHostTrue.value ? getStartTabInputLinkHostTrue.value : ''
                    },
                    content: getStartTab.value === 'github' ? (
                        getStartTabInputGithub.value ? ('https://raw.githubusercontent.com/Maseshi/' + getStartTabInputGithub.value) : ''
                    ) : getStartTab.value === 'huggingface' ? (
                        getStartTabInputHuggingface.value ? ('https://huggingface.co/Maseshi/' + getStartTabInputHuggingface.value) : ''
                    ) : ''
                }
            }
        }
    }
    const disableInput = (boolean) => {
        const projectIcon = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "UploadIcon")
        const projectName = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Name')
        const projectType = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Type')
        const projectDate = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Date')
        const projectStatus = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Status')
        const projectTag = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Tag')
        const projectButtonName = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'ButtonName')
        const projectButtonLink = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'ButtonLink')
        const projectLink = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Link')
        const projectDescription = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Description')

        const getStartTabValueNone = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'ValueNone')
        const getStartTabValueGithub = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'ValueGithub')
        const getStartTabValueHuggingface = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'ValueHuggingface')
        const getStartTabInputGithub = document.getElementById('getStartTab' + (data ? data.title.replace(' ', '') : '') + 'InputGithub')

        const changelogTabValueNone = document.getElementById('changelogTab' + (data ? data.title.replace(' ', '') : '') + 'ValueNone')
        const changelogTabValueGithub = document.getElementById('changelogTab' + (data ? data.title.replace(' ', '') : '') + 'ValueGithub')
        const changelogTabInputGithub = document.getElementById('changelogTab' + (data ? data.title.replace(' ', '') : '') + 'InputGithub')

        const sourceCodeTabValueNone = document.getElementById('sourceCodeTab' + (data ? data.title.replace(' ', '') : '') + 'ValueNone')
        const sourceCodeTabValueGithub = document.getElementById('sourceCodeTab' + (data ? data.title.replace(' ', '') : '') + 'ValueGithub')
        const sourceCodeTabInputGithub = document.getElementById('sourceCodeTab' + (data ? data.title.replace(' ', '') : '') + 'InputGithub')

        projectIcon.disabled = boolean
        projectName.disabled = boolean
        projectType.disabled = boolean
        projectDate.disabled = boolean
        projectStatus.disabled = boolean
        projectTag.disabled = boolean
        projectButtonName.disabled = boolean
        projectButtonLink.disabled = boolean
        projectLink.disabled = boolean
        projectDescription.disabled = boolean

        getStartTabValueNone.disabled = boolean
        getStartTabValueGithub.disabled = boolean
        getStartTabValueHuggingface.disabled = boolean
        if (getStartTabInputGithub) getStartTabInputGithub.disabled = boolean

        changelogTabValueNone.disabled = boolean
        changelogTabValueGithub.disabled = boolean
        if (changelogTabInputGithub) changelogTabInputGithub.disabled = boolean

        sourceCodeTabValueNone.disabled = boolean
        sourceCodeTabValueGithub.disabled = boolean
        if (sourceCodeTabInputGithub) sourceCodeTabInputGithub.disabled = boolean
    }

    const handleSubmit = async (event) => {
        const storage = getStorage()
        const database = getFirestore()

        const uploadIconInput = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "UploadIcon")
        const projectNameInput = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "Name")

        let projectIcon = data ? data.iconReference.path : ''
        const projectID = projectNameInput.value.toLowerCase().replace(' ', '-')
        const projectData = checkInput(event)

        disableInput(true)
        event.target.disabled = true
        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)

        try {
            if (projectData) {
                if (uploadIconInput.files[0]) {
                    const iconFileName = 'ic_' + (data ? data.id.replace('-', '_') : projectID.replace('-', '_')) + '.webp'
                    const storageRef = ref(storage, 'data/images/' + (data ? data.id : projectID) + '/' + iconFileName)
                    const resizedImage = await resizeImage({
                        file: uploadIconInput.files[0],
                        maxSize: 200
                    })
                    const snapshot = await uploadBytes(storageRef, resizedImage)

                    projectIcon = snapshot.ref.fullPath
                }

                await setDoc(doc(database, 'Projects', (data ? data.id : projectID)), {
                    image: {
                        background: '',
                        icon: projectIcon ? doc(database, projectIcon) : ''
                    },
                    ...projectData
                })

                if (data) {
                    const cancelButton = document.getElementById('editorProject' + (data ? data.title.replace(' ', '') : '') + 'Cancel')

                    if (data.id !== projectID) {
                        await deleteDoc(doc(database, 'Projects', data.id))

                        const renewProject = document.getElementById('v-pills-' + projectID)

                        if (renewProject) renewProject.click()
                    } else {
                        if (cancelButton) cancelButton.click()
                    }
                } else {
                    const newProject = document.getElementById('v-pills-' + projectID)

                    if (newProject) newProject.click()
                }
            }

            disableInput(false)
            event.target.disabled = false
            event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)
            setTimeout(() => {
                event.target.innerHTML = '<i class="bi bi-check2-square"></i> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)
                setClearData(true)
                setTimeout(() => {
                    setClearData(false)
                }, 3000)
            }, 3000)
        } catch (error) {
            console.log(error)
            disableInput(false)
            event.target.disabled = false
            event.target.innerHTML = '<i class="bi bi-x-circle"></i> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)
            setTimeout(() => {
                event.target.innerHTML = '<i class="bi bi-check2-square"></i> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)
            }, 3000)
        }
    }
    const handlePreview = async (event) => {
        const uploadIconInput = document.getElementById("editorProject" + (data ? data.title.replace(' ', '') : '') + "UploadIcon")

        let projectIcon = data ? data.icon : ''
        const projectData = checkInput(event)

        disableInput(true)
        event.target.disabled = true
        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_view)

        if (projectData) {
            if (uploadIconInput.files[0]) {
                const resizedImage = await resizeImage({
                    file: uploadIconInput.files[0],
                    maxSize: 200
                })
                projectIcon = URL.createObjectURL(resizedImage)
            }

            setPreviewData({
                id: data.id,
                icon: projectIcon,
                ...projectData
            })
            setPreviewMode(true)
        }

        disableInput(false)
        event.target.disabled = false
        event.target.innerHTML = '<i class="bi bi-display"></i> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_view)
    }

    return (
        <>
            {
                userData && userData.user.role === 'owner' ? (
                    <>
                        {
                            clearData ? (
                                <div className="projects-new-clear-data">
                                    <i className="bi bi-stars"></i>
                                    <br />
                                    <h3>
                                        {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.cleaning_up}
                                    </h3>
                                    <p>
                                        {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.cleaning_up_description}
                                    </p>
                                </div>
                            ) : (
                                <div className="projects-new-create" hidden={previewMode ? true : false}>
                                    {
                                        data ? (
                                            <div className="text-center">
                                                <h2>
                                                    แก้ไขข้อมูล
                                                </h2>
                                                <p>
                                                    กำลังเปลี่ยนข้อมูลของโครงการ {data.title}
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <h2>
                                                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.new_project}
                                                </h2>
                                                <p>
                                                    {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.new_project_description}
                                                </p>
                                            </div>
                                        )
                                    }
                                    <br />
                                    <div className="row">
                                        <div className="col-md-2">
                                            <EditorIcon data={data} />
                                        </div>
                                        <div className="col-md-10">
                                            <EditorDetails data={data} pages={pages} />
                                        </div>
                                    </div>
                                    <hr />
                                    <h3>
                                        {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.detail}
                                    </h3>
                                    <p>
                                        {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.detail_description}
                                    </p>
                                    <div className="projects-new-detail d-flex align-items-start">
                                        <div className="nav flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                            <button
                                                className="nav-link active"
                                                id={
                                                    data ? (
                                                        'v-pills-' + data.id + '-get-start-tab'
                                                    ) : (
                                                        'v-pills-get-start-tab'
                                                    )
                                                }
                                                data-bs-toggle="pill"
                                                data-bs-target={
                                                    data ? (
                                                        '#v-pills-' + data.id + '-get-start'
                                                    ) : (
                                                        '#v-pills-get-start'
                                                    )
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls={
                                                    data ? (
                                                        'v-pills-' + data.id + '-get-start'
                                                    ) : (
                                                        'v-pills-get-start'
                                                    )
                                                }
                                                aria-selected="true"
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.get_started}
                                            </button>
                                            <button
                                                className="nav-link"
                                                id={
                                                    data ? (
                                                        'v-pills-' + data.id + '-news-tab'
                                                    ) : (
                                                        'v-pills-news-tab'
                                                    )
                                                }
                                                data-bs-toggle="pill"
                                                data-bs-target={
                                                    data ? (
                                                        '#v-pills-' + data.id + '-news'
                                                    ) : (
                                                        '#v-pills-news-tab'
                                                    )
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls={
                                                    data ? (
                                                        'v-pills-' + data.id + '-news'
                                                    ) : (
                                                        'v-pills-news-tab'
                                                    )
                                                }
                                                aria-selected="false"
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.news}
                                            </button>
                                            <button
                                                className="nav-link"
                                                id={
                                                    data ? (
                                                        'v-pills-' + data.id + '-documents-tab'
                                                    ) : (
                                                        'v-pills-documents-tab'
                                                    )
                                                }
                                                data-bs-toggle="pill"
                                                data-bs-target={
                                                    data ? (
                                                        '#v-pills-' + data.id + '-documents'
                                                    ) : (
                                                        '#v-pills-documents'
                                                    )
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls={
                                                    data ? (
                                                        'v-pills-' + data.id + '-documents'
                                                    ) : (
                                                        'v-pills-documents'
                                                    )
                                                }
                                                aria-selected="false"
                                                disabled
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.documents_soon}
                                            </button>
                                            <button
                                                className="nav-link"
                                                id={
                                                    data ? (
                                                        'v-pills-' + data.id + '-changelog-tab'
                                                    ) : (
                                                        'v-pills-changelog-tab'
                                                    )
                                                }
                                                data-bs-toggle="pill"
                                                data-bs-target={
                                                    data ? (
                                                        '#v-pills-' + data.id + '-changelog'
                                                    ) : (
                                                        '#v-pills-changelog'
                                                    )
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls={
                                                    data ? (
                                                        'v-pills-' + data.id + '-changelog'
                                                    ) : (
                                                        'v-pills-changelog'
                                                    )
                                                }
                                                aria-selected="false"
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.changelog}
                                            </button>
                                            <button
                                                className="nav-link"
                                                id={
                                                    data ? (
                                                        'v-pills-' + data.id + '-source-code-tab'
                                                    ) : (
                                                        'v-pills-source-code-tab'
                                                    )
                                                }
                                                data-bs-toggle="pill"
                                                data-bs-target={
                                                    data ? (
                                                        '#v-pills-' + data.id + '-source-code'
                                                    ) : (
                                                        '#v-pills-source-code'
                                                    )
                                                }
                                                type="button"
                                                role="tab"
                                                aria-controls={
                                                    data ? (
                                                        'v-pills-' + data.id + '-source-code'
                                                    ) : (
                                                        'v-pills-source-code'
                                                    )
                                                }
                                                aria-selected="false"
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.source_code}
                                            </button>
                                        </div>
                                        <div className="projects-new-detail-content tab-content" id="v-pills-tabContent">
                                            <GetStart data={data} />
                                            <News data={data} newsData={newsData} userData={userData} />
                                            <Documents data={data} />
                                            <Changelog data={data} />
                                            <SourceCode data={data} />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="projects-new-action">
                                        <div className="row row-cols-1 row-cols-md-2 g-2">
                                            <div className="col">
                                                <button
                                                    className="btn btn-primary w-100"
                                                    type="button"
                                                    onClick={(event) => handleSubmit(event)}
                                                >
                                                    <i className="bi bi-check2-square"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public}
                                                </button>
                                            </div>
                                            <div className="col">
                                                <button
                                                    className="btn btn-secondary w-100"
                                                    type="button"
                                                    onClick={(event) => handlePreview(event)}
                                                >
                                                    <i className="bi bi-display"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_view}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {
                            previewMode ? (
                                <div className="projects-new-preview" hidden={previewMode ? false : true}>
                                    <nav className="projects-new-navbar-preview navbar bg-light">
                                        <div className="container-fluid">
                                            <span className="navbar-brand mb-0 h1">
                                                <i className="bi bi-view-stacked"></i> {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_mode}
                                            </span>
                                            <span className="navbar-text">
                                                <button
                                                    type="button"
                                                    className="btn btn-light"
                                                    onClick={() => setPreviewMode(false)}
                                                >
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </nav>
                                    <br />
                                    <ContentDetail data={previewData} />
                                    <ContentTabs data={previewData} userData={userData} parameter={parameter} />
                                </div>
                            ) : ''
                        }
                    </>
                ) : (
                    <div className="projects-new-lock">
                        <i className="bi bi-lock"></i>
                        <br />
                        <h3>
                            {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.rejected}
                        </h3>
                        <p>
                            {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.rejected_description}
                        </p>
                    </div>
                )
            }
        </>
    )
}
