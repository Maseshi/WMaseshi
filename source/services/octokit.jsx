import { Octokit } from '@octokit/rest'

import config from '@/configs'

const octokit = new Octokit({ auth: config.OCTOKIT })

export default octokit
