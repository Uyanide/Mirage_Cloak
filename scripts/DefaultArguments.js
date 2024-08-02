(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.DefaultArguments = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    class DefaultArguments {
        async loadDefaultArguments(jsonPath) {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            const defaultArguments = await response.json();
            this.defaultPageId = defaultArguments.defaultPageId;

            this.version = defaultArguments.version;
            this.default_threshold = defaultArguments.default_threshold;
            this.default_difference = defaultArguments.default_difference;
            this.version_1 = defaultArguments.version_1;
            this.contrast_inner = defaultArguments.contrast_inner;
            this.contrast_cover = defaultArguments.contrast_cover;
            this.luminance_inner = defaultArguments.luminance_inner;
            this.luminance_cover = defaultArguments.luminance_cover;
            this.mirage_size = defaultArguments.mirage_size;
            this.add_mark = defaultArguments.add_mark;
            this.mark_path = defaultArguments.mark_path;
            this.mark_ratio = defaultArguments.mark_ratio;
        }

        setDefaultValues = () => {
            document.getElementById('innerContrastRange').value = this.contrast_inner;
            document.getElementById('coverContrastRange').value = this.contrast_cover;
            document.getElementById('innerLuminanceRange').value = this.luminance_inner;
            document.getElementById('coverLuminanceRange').value = this.luminance_cover;
            document.getElementById('isAddMarkCheckbox').checked = this.add_mark;
            document.getElementById('mirageSizeInput').value = this.mirage_size;
        }
    }

    return DefaultArguments;
}));

errorHandling.scriptsLoaded.DefaultArguments = true;