const Mask = {
    apply(input, func) {
        setTimeout(function () {
            input.value = Mask[func](input.value);
        }, 1);
    },

    formatBRL(value) {
        value = value.replace(/\D/g, "");

        return value = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100);
    }
}

const PhotosUpload = {
    handleFileInput(event) {
        const { files: fileList } = event.target;
        uploadLimit = 6;

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos!`);
            event.preventDefault();
            return
        }

        Array.from(fileList).forEach(file => {
            const reader = new FileReader();


            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = document.createElement('div');
                div.classList.add('photo');
                div.onclick = () => alert("removeu foto");

                div.appendChild(image);

                document.querySelector('#photos-preview').appendChild(div);

            }

            reader.readAsDataURL(file)

        });

    }
}