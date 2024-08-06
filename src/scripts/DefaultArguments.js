import DefaultArgumentsConfig from '../DefaultArgumentsConfig.json';

export class DefaultArguments {
    loadDefaultArguments = () => {
        this.app_version = DefaultArgumentsConfig.app_version;
        this.defaultPageId = DefaultArgumentsConfig.defaultPageId;
        this.version = DefaultArgumentsConfig.version;
        this.default_threshold = DefaultArgumentsConfig.default_threshold;
        this.default_difference = DefaultArgumentsConfig.default_difference;
        this.max_difference = DefaultArgumentsConfig.max_difference;
        this.min_difference = DefaultArgumentsConfig.min_difference;
        this.version_1 = DefaultArgumentsConfig.version_1;
        this.version_2 = DefaultArgumentsConfig.version_2;
        this.version_0 = DefaultArgumentsConfig.version_0;
        this.contrast_inner = DefaultArgumentsConfig.contrast_inner;
        this.contrast_cover = DefaultArgumentsConfig.contrast_cover;
        this.luminance_inner = DefaultArgumentsConfig.luminance_inner;
        this.luminance_cover = DefaultArgumentsConfig.luminance_cover;
        this.mirage_size = DefaultArgumentsConfig.mirage_size;
        this.add_mark = DefaultArgumentsConfig.add_mark;
        this.encode_compress = DefaultArgumentsConfig.encode_compress;
        this.encode_compress_quality = DefaultArgumentsConfig.encode_compress_quality;
        this.mark_ratio = DefaultArgumentsConfig.mark_ratio;
    }

    setDefaultValues = () => {
        document.getElementById('innerContrastRange').value = this.contrast_inner;
        document.getElementById('coverContrastRange').value = this.contrast_cover;
        document.getElementById('innerLuminanceRange').value = this.luminance_inner;
        document.getElementById('coverLuminanceRange').value = this.luminance_cover;
        document.getElementById('isAddMarkCheckbox').checked = this.add_mark;
        document.getElementById('isEncodeCompressCheckbox').checked = this.encode_compress;
        document.getElementById('mirageSizeInput').value = this.mirage_size;
        document.getElementById('encodeMethodSelect').value = this.version.toString();
    }
}