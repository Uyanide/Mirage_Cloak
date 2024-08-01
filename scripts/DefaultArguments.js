class DefaultArguments {
    async loadDefaultArguments(jsonPath) {
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            const defaultArguments = await response.json();
            this.defaultPageId = defaultArguments.defaultPageId;

            this.version = defaultArguments.version;
            this.threshold = defaultArguments.threshold;
            this.remained = defaultArguments.remained;
            this.difference = defaultArguments.difference;
            this.padding = defaultArguments.padding;
            this.scale_inner = defaultArguments.scale_inner;
            this.scale_cover = defaultArguments.scale_cover;
            this.offset_inner = defaultArguments.offset_inner;
            this.offset_cover = defaultArguments.offset_cover;
            this.contrast_inner = defaultArguments.contrast_inner;
            this.contrast_cover = defaultArguments.contrast_cover;
            this.luminance_inner = defaultArguments.luminance_inner;
            this.luminance_cover = defaultArguments.luminance_cover;
            this.mirage_size = defaultArguments.mirage_size;
            this.encode_size = defaultArguments.encode_size;
            this.add_mark = defaultArguments.add_mark;
            this.mark_path = defaultArguments.mark_path;
            this.mark_ratio = defaultArguments.mark_ratio;
        } catch (error) {
            console.error('加载默认参数失败:', error);
        }
    }

    setDefaultValues() {
        document.getElementById('innerContrastRange').value = this.contrast_inner;
        document.getElementById('coverContrastRange').value = this.contrast_cover;
        document.getElementById('innerLuminanceRange').value = this.luminance_inner;
        document.getElementById('coverLuminanceRange').value = this.luminance_cover;
        document.getElementById('isAddMarkCheckbox').checked = this.add_mark;
        document.getElementById('mirageSizeInput').value = this.mirage_size;
    }
}

errorHandling.scriptsLoaded.DefaultArguments = true;