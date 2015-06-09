//            _   _   _                    __                          _
//   ___  ___| |_| |_(_)_ __   __ _ ___   / _| ___  _ __    __ _ _   _| |_ __
//  / __|/ _ \ __| __| | '_ \ / _` / __| | |_ / _ \| '__|  / _` | | | | | '_ \
//  \__ \  __/ |_| |_| | | | | (_| \__ \ |  _| (_) | |    | (_| | |_| | | |_) |
//  |___/\___|\__|\__|_|_| |_|\__, |___/ |_|  \___/|_|     \__, |\__,_|_| .__/
//                            |___/                        |___/        |_|
var dest = './app';
var src = './src';

module.exports = {
    browserSync: {
        server: {
            baseDir: [dest, src]
        },
        files: [
            dest + "/**",
            "!" + dest + "/**.map"
        ]
    },
    style: {
        src: {
            scss: src + "/style/style.scss",
            less: src + "/style/style.less"
        },
        watch: src +  "/style/**",
        dest: dest + "/style",
        settings: {
            scss : {
                includePaths: require('node-bourbon').includePaths
            },
            less: {

            }
        }
    },
    view: {
        src: src + "/view/*.jade",
        files: [src + "/view/**/*.jade", src + "/assets/data.json"],
        data: src + "/assets/data.json",
        dest: dest
    },
    images: {
        src: src + "/assets/img/**",
        dest: dest + "/img"
    },
    sprites: {
        files: src + "/assets/icons/**/*.png",
        src: src + "/assets/icons/**/*.png",
        dest: {
            icons: dest + "/icons",
            src: src + "/assets/icons"
        },
        spritesmith: {
            imgName: "sprites.png",
            imgPath: "/icons/sprite.png",
            cssName: "sprites.css",
            cssFormat: "css"
        }
    },
    webpack: {
        name: 'browser',
        target: 'web',
        entry: src + "/js/suite.js",
        output: {
            path: './app',
            filename: "/js/[name].js"
        },
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader?stage=0'
                }
            ]
        },
        plugins: [

        ],
        resolve: {
            modulesDirectories: [
                'src',
                'src/components',
                'bower_components',
                'node_modules'
            ]
        }
    },
    assets: {
        src: src + '/assets/**',
        bundleConfigs: [
            {
                src: src + '/assets/fonts/**',
                dest: dest + '/fonts'
            }
        ]
    }
};