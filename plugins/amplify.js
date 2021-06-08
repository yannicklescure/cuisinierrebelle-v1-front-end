import Vue from 'vue'
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Vue.use(AmplifyPlugin, AmplifyModules)


// import { Amplify } from "aws-amplify"
import awsExports from "../src/aws-exports"
Amplify.configure({ ...awsExports, ssr: true })
