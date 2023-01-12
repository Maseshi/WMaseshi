import { useState } from 'react'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes } from "firebase/storage";

import ContentDetail from '../../PageContents/ContentDetail'
import ContentTabs from '../../PageContents/ContentTabs'
import UploadIcon from './UploadIcon'
import Details from './Details'
import GetStart from './Tabs/GetStart'
import News from './Tabs/News'
import Documents from './Tabs/Documents'
import Changelog from './Tabs/Changelog'
import SourceCode from './Tabs/SourceCode'

import { resizeImage } from '../../../../../utils/functions/resizeImage'
import { validURL } from '../../../../../utils/functions/validURL'
import { translator } from '../../../../../utils/functions/translator';

export default function ProjectsEditor(props) {
    const [previewData, setPreviewData] = useState()
    const [previewMode, setPreviewMode] = useState(false)
    const [clearData, setClearData] = useState(false)

    const userDataProps = props.userData
    const loadedProps = props.loaded
    const parameterProps = props.parameter
    const pagesIDProps = props.pagesID

    const news = []

    const checkInput = () => {
        const projectName = document.getElementById("newProjectName")
        const ProjectNameValidate = document.getElementById("newProjectNameValidate")
        const projectType = document.getElementById("newProjectType")
        const projectTypeValidate = document.getElementById("newProjectTypeValidate")
        const projectDate = document.getElementById("newProjectDate")
        const projectStatus = document.getElementById("newProjectStatus")
        const projectTag = document.getElementById("newProjectTag")
        const projectButtonName = document.getElementById("newProjectButtonName")
        const projectButtonLink = document.getElementById("newProjectButtonLink")
        const projectButtonValidate = document.getElementById("newProjectButtonValidate")
        const projectLink = document.getElementById("newProjectLink")
        const projectLinkValidate = document.getElementById("newProjectLinkValidate")
        const projectDescription = document.getElementById("newProjectDescription")
        const projectDescriptionValidate = document.getElementById("newProjectDescriptionValidate")
        const getStartInfo = document.querySelector('input[name="getStartInfo"]:checked')
        const getStartRefURL = document.getElementById("getStartRefURL")
        const changelogInfo = document.querySelector('input[name="changelogInfo"]:checked')
        const changelogRefURL = document.getElementById("changelogRefURL")
        const sourceCodeInfo = document.querySelector('input[name="sourceCodeInfo"]:checked')
        const sourceCodeRefURL = document.getElementById("sourceCodeRefURL")

        const format = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/

        // Verify the project name and convert it to project ID.
        if (!projectName.value) {
            ProjectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_is_empty
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        if (format.test(projectName.value)) {
            ProjectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_must_do_not_have_special_character
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        if (projectName.value.length < projectName.minLength) {
            ProjectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_too_short.replace('%s', projectName.minLength)
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        if (projectName.value.length >= projectName.maxLength) {
            ProjectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_too_long.replace('%s', projectName.maxLength)
            projectName.classList.remove('is-valid')
            projectName.classList.add('is-invalid')
            return false
        }

        const projectID = projectName.value.toLowerCase().replace(' ', '-')

        if (pagesIDProps.includes('new-project')) pagesIDProps.splice(pagesIDProps.indexOf('new-project'), 1)
        if (pagesIDProps.includes(projectID)) {
            ProjectNameValidate.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.name_is_duplicate
            projectName.classList.add('is-invalid')
            return false
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
            id: projectID,
            title: projectName.value,
            type: projectType.value,
            established: projectDate.value ? new Date(projectDate.value) : '',
            status: Number(projectStatus.value),
            tag: tags,
            button: [
                {
                    color: 0,
                    disabled: false,
                    link: projectButtonLink.value,
                    name: projectButtonName.value
                }
            ],
            link: projectLink.value,
            description: projectDescription.value,
            tab: {
                changelog: changelogInfo.value === '0' ? '' : changelogRefURL.value,
                document: '',
                news: news,
                sourcecode: sourceCodeInfo.value === '0' ? '' : sourceCodeRefURL.value,
                started: getStartInfo.value === '0' ? '' : 'https://raw.githubusercontent.com/Maseshi/' + getStartRefURL.value
            }
        }
    }

    const disableInput = (boolean) => {
        const projectName = document.getElementById("newProjectName")
        const projectType = document.getElementById("newProjectType")
        const projectDate = document.getElementById("newProjectDate")
        const projectStatus = document.getElementById("newProjectStatus")
        const projectTag = document.getElementById("newProjectTag")
        const projectButtonName = document.getElementById("newProjectButtonName")
        const projectButtonLink = document.getElementById("newProjectButtonLink")
        const projectLink = document.getElementById("newProjectLink")
        const projectDescription = document.getElementById("newProjectDescription")
        const getStartInfo = document.querySelector('input[name="getStartInfo"]:checked')
        const getStartRefURL = document.getElementById("getStartRefURL")
        const changelogInfo = document.querySelector('input[name="changelogInfo"]:checked')
        const changelogRefURL = document.getElementById("changelogRefURL")
        const sourceCodeInfo = document.querySelector('input[name="sourceCodeInfo"]:checked')
        const sourceCodeRefURL = document.getElementById("sourceCodeRefURL")

        projectName.disabled = boolean
        projectType.disabled = boolean
        projectDate.disabled = boolean
        projectStatus.disabled = boolean
        projectTag.disabled = boolean
        projectButtonName.disabled = boolean
        projectButtonLink.disabled = boolean
        projectLink.disabled = boolean
        projectDescription.disabled = boolean
        getStartInfo.disabled = boolean
        if (getStartRefURL) getStartRefURL.disabled = boolean
        changelogInfo.disabled = boolean
        if (changelogRefURL) changelogRefURL.disabled = boolean
        sourceCodeInfo.disabled = boolean
        if (sourceCodeRefURL) sourceCodeRefURL.disabled = boolean
    }

    return (
        <>
            {
                loadedProps && userDataProps && userDataProps.user.role === 'owner' ? (
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
                                    <div className="text-center">
                                        <h2>
                                            {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.new_project}
                                        </h2>
                                        <p>
                                            {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.new_project_description}
                                        </p>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-2">
                                            <UploadIcon />
                                        </div>
                                        <div className="col-md-10">
                                            <Details pagesID={pagesIDProps} />
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
                                            <button className="nav-link active" id="v-pills-get-start-tab" data-bs-toggle="pill" data-bs-target="#v-pills-get-start" type="button" role="tab" aria-controls="v-pills-get-start" aria-selected="true">
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.get_started}
                                            </button>
                                            <button className="nav-link" id="v-pills-news-tab" data-bs-toggle="pill" data-bs-target="#v-pills-news" type="button" role="tab" aria-controls="v-pills-news" aria-selected="false">
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.news}
                                            </button>
                                            <button className="nav-link" id="v-pills-documents-tab" data-bs-toggle="pill" data-bs-target="#v-pills-documents" type="button" role="tab" aria-controls="v-pills-documents" aria-selected="false" disabled>
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.documents_soon}
                                            </button>
                                            <button className="nav-link" id="v-pills-changelog-tab" data-bs-toggle="pill" data-bs-target="#v-pills-changelog" type="button" role="tab" aria-controls="v-pills-changelog" aria-selected="false">
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.changelog}
                                            </button>
                                            <button className="nav-link" id="v-pills-source-code-tab" data-bs-toggle="pill" data-bs-target="#v-pills-source-code" type="button" role="tab" aria-controls="v-pills-source-code" aria-selected="false">
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.source_code}
                                            </button>
                                        </div>
                                        <div className="projects-new-detail-content tab-content" id="v-pills-tabContent">
                                            <GetStart />
                                            <News news={news} userData={userDataProps} />
                                            <Documents />
                                            <Changelog />
                                            <SourceCode />
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="projects-new-action">
                                        <div className="text-center d-grid gap-2 d-md-block">
                                            <button
                                                className="projects-content-button btn btn-primary mx-2"
                                                type="button"
                                                onClick={
                                                    async (event) => {
                                                        disableInput(true)
                                                        event.target.disabled = true
                                                        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)

                                                        const uploadIcon = document.getElementById("newProjectUploadIcon")
                                                        const projectName = document.getElementById("newProjectName")
                                                        const projectID = projectName.value.toLowerCase().replace(' ', '-')
                                                        const data = checkInput(event)

                                                        uploadIcon.disabled = true

                                                        if (data) {
                                                            let url
                                                            const db = getFirestore();

                                                            if (uploadIcon.files[0]) {
                                                                const storage = getStorage()
                                                                const fileName = 'ic_' + projectID.replace('-', '_') + '.webp'
                                                                const storageRef = ref(storage, 'data/images/' + projectID + '/' + fileName)
                                                                const resizedImage = await resizeImage({
                                                                    "file": uploadIcon.files[0],
                                                                    "maxSize": 200
                                                                })
                                                                const snapshot = await uploadBytes(storageRef, resizedImage)
                                                                url = snapshot.ref.fullPath
                                                            }

                                                            await setDoc(doc(db, 'Projects', data.id), {
                                                                image: {
                                                                    background: '',
                                                                    icon: url ? doc(db, url) : ''
                                                                },
                                                                ...data
                                                            })

                                                            const newProject = document.getElementById('v-pills-' + data.id)

                                                            if (newProject) newProject.click()
                                                        }

                                                        disableInput(false)
                                                        uploadIcon.disabled = false
                                                        event.target.disabled = false
                                                        event.target.innerHTML = '<i class="bi bi-check-circle"></i> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public)
                                                        setTimeout(() => {
                                                            setClearData(true)
                                                            setTimeout(() => {
                                                                setClearData(false)
                                                            }, 3000)
                                                        }, 3000)
                                                    }
                                                }
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.public}
                                            </button>
                                            <button
                                                className="projects-content-button btn btn-secondary mx-2"
                                                type="button"
                                                onClick={
                                                    async (event) => {
                                                        disableInput(true)
                                                        event.target.disabled = true
                                                        event.target.innerHTML = '<span class="spinner-border spinner-border-sm align-middle" role="status" aria-hidden="true"></span> %s'.replace('%s', translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_view)

                                                        const uploadIcon = document.getElementById("newProjectUploadIcon")
                                                        const data = checkInput(event)

                                                        uploadIcon.disabled = true

                                                        if (data) {
                                                            let url

                                                            if (uploadIcon.files[0]) {
                                                                const resizedImage = await resizeImage({
                                                                    "file": uploadIcon.files[0],
                                                                    "maxSize": 200
                                                                });
                                                                url = URL.createObjectURL(resizedImage)
                                                            }

                                                            setPreviewData({
                                                                icon: url,
                                                                ...data
                                                            })
                                                            setPreviewMode(true)
                                                        }

                                                        disableInput(false)
                                                        uploadIcon.disabled = false
                                                        event.target.disabled = false
                                                        event.target.innerHTML = translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_view
                                                    }
                                                }
                                            >
                                                {translator().translate.pages.Projects.Pages.PageEditor.ContentEditor.ContentEditor.example_view}
                                            </button>
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
                                            <span class="navbar-text">
                                                <button
                                                    type="button"
                                                    className="btn btn-light"
                                                    onClick={
                                                        () => setPreviewMode(false)
                                                    }
                                                >
                                                    <i className="bi bi-x-lg"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </nav>
                                    <br />
                                    <ContentDetail data={previewData} />
                                    <ContentTabs data={previewData} userData={userDataProps} parameter={parameterProps} />
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
