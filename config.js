module.exports = {
    build: "./build",
    tasks: "./tasks",
    sourcemaps: "../maps",
    favicon: {
        src: "./src/favicon.{ico,png}",
        watch: "./src/favicon.{ico,png}",
        build: "./build/",
    },
    scripts: {
        src: "./src/js/*.{js,jsx}",
        watch: "./src/js/**/*.{js,jsx}",
        build: "./build/assets/js/",
        entry: "./src/js/app.js"
    },
    styles: {
        src: "./src/sass/*.{scss,sass}",
        watch: "./src/sass/**/*.{scss,sass}",
        build: "./build/assets/css/",
    },
    images: {
        src: "./src/images/**/*.{jpg,png}",
        watch: "./src/images/**/*.{jpg,png}",
        build: "./build/assets/img/",
    },
    pictures: {
        src: "./src/pictures/**/*.{jpg,png}",
        watch: "./src/pictures/**/*.{jpg,png}",
        build: "./build/pictures/",
    },
    embed: {
        src: "./src/embed/**/*.{jpg,png}",
        watch: "./src/embed/**/*.{jpg,png}",
        build: "./src/embed-opt/",
    },
    sprites: {
        src: "./src/sprites/**/*.png",
        watch: "./src/sprites/**/*.png",
        build: "./src/sass/include/",
    },
    pug: {
        src: "./src/*.pug",
        watch: [
            "./src/**/*.{pug,json}",
            "./src/data/**/*"
        ],
        data: "./src/data/",
        build: "./build/",
    },
    html: {
        src: "./src/*.html",
        watch: "./src/*.html",
        build: "./build/",
    },
    fonts: {
        src: [
            './src/fonts/**/*',
            './node_modules/bootstrap-sass/assets/fonts/**/*'
        ],
        watch: "./src/fonts/**/*",
        build: './build/assets/fonts',
        formats: "woff ttf eot svg"
    },
    sass: {
        precision: 3,
        errLogToConsole: true,
        includePaths: [
            './node_modules/swiper/dist/css/',
            './node_modules/bootstrap-sass/assets/stylesheets',
            './node_modules/compass-mixins/lib'
        ]
    },
    browser: {
        server: {
            baseDir: "./build"
        },
        tunnel: false,
        host: 'localhost',
        port: 8000,
        logPrefix: "maderwin"
    }
};