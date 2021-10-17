def imageName = 'movies-store'
def registry = '741767866316.dkr.ecr.us-east-1.amazonaws.com'
def region = 'us-east-1'

node('workers'){
    stage('Checkout'){
        checkout scm
    }

    def imageTest = docker.build("${imageName}-test", "-f Dockerfile.test .")


    stage('Qulity Tests'){
        imageTest.inside{
            sh 'npm run lint'
        }
    }

    stage('Integration Tests') {
        sh "docker run --rm ${imageName}-test npm run test"
    }

    stage('Coverage Reports' ) {
        sh "docker run --rm -v $PWD/coverage:/app/coverage ${imageName}-test npm run coverage-html"
        publishHTML (target: [
            allowMissing: false,
            alwaysLinkToLastBuild: false,
            keepAll: true,
            reportDir: "$PWD/coverage",
            reportFiles: "index.html",
            reportName: "Coverage Report"
        ])
        }


    stage('Build') {
        docker.build(imageName)
    }


    stage('Push'){
        sh "\$(aws ecr get-login --no-include-email --region ${region}) || true"
        docker.withRegistry("https://${registry}") {
            docker.image(imageName).push(commitID())

            if (env.BRANCH_NAME == 'dev') {
                docker.image(imageName).push('develop')
            }

            if (env.BRANCH_NAME == 'preprod') {
                docker.image(imageName).push('preprod')
            }

            if (env.BRANCH_NAME == 'main') {
                docker.image(imageName).push('latest')
            }
        }
    }

    stage('Analyze'){
        def scannedImage = "${registry}/${imageName}:${commitID()} ${workspace}/Dockerfile"
        writeFile file: 'images', text: scannedImage
        anchore name: 'images',forceAnalyze: true
    }
}


def commitID() {
    sh 'git rev-parse HEAD > .git/commitID'
    def commitID = readFile('.git/commitID').trim()
    sh 'rm .git/commitID'
    commitID
}
