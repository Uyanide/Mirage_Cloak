import DefaultArgumentsConfig from '../DefaultArgumentsConfig.json';

const loadDefaultArguments = () => {
    return DefaultArgumentsConfig;
}

const setDefaultValues = () => {
    document.getElementById('innerContrastRange').value = DefaultArgumentsConfig.contrast_inner;
    document.getElementById('coverContrastRange').value = DefaultArgumentsConfig.contrast_cover;
    document.getElementById('innerLuminanceRange').value = DefaultArgumentsConfig.luminance_inner;
    document.getElementById('coverLuminanceRange').value = DefaultArgumentsConfig.luminance_cover;
    document.getElementById('isAddMarkCheckbox').checked = DefaultArgumentsConfig.add_mark;
    document.getElementById('isEncodeCompressCheckbox').checked = DefaultArgumentsConfig.encode_compress;
    document.getElementById('mirageSizeInput').value = DefaultArgumentsConfig.mirage_size;
    document.getElementById('encodeMethodSelect').value = DefaultArgumentsConfig.version;
}

const DefaultArguments = {
    loadDefaultArguments,
    setDefaultValues,
};

export { DefaultArguments };