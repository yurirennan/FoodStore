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



let PhotosUpload = {
    input: "",
    files: [],
    handleFileInput(event) {
        PhotosUpload.input = event.target;
        fileList = PhotosUpload.input.files;
        uploadLimit = 6;

        if (fileList.length > uploadLimit) {
            alert(`Envie no máximo ${uploadLimit} fotos!`);
            event.preventDefault();
            return
        }

        const arrayPhotos = [];
        document.querySelector('#photos-preview').childNodes.forEach(item => {
            if (item.classList && item.classList.value == "photo") {
                arrayPhotos.push(item);
            }
        })

        const totalPhotos = fileList.length + arrayPhotos.length;
        if (totalPhotos > uploadLimit) {
            alert("Limite máximo de fotos Atingido!");
            event.preventDefault();
            return
        }

        Array.from(fileList).forEach(file => {
            PhotosUpload.files.push(file);
            const reader = new FileReader();


            reader.onload = () => {
                const image = new Image();
                image.src = String(reader.result);

                const div = document.createElement('div');
                div.classList.add('photo');
                div.onclick = (event) => PhotosUpload.removePhoto(event);

                div.appendChild(image);

                document.querySelector('#photos-preview').appendChild(div).appendChild(PhotosUpload.removeButton());
            }

            reader.readAsDataURL(file)

        });

        PhotosUpload.input.files = PhotosUpload.getAllFiles();

    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer();

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file));

        return dataTransfer.files;
    },
    removeButton() {
        const button = document.createElement('i');
        button.classList.add('material-icons');
        button.innerHTML = "close";
        return button;
    },

    removePhoto(event) {
        photoPreview = document.querySelector('#photos-preview')
        const photoDiv = event.target.parentNode;
        const photosArray = Array.from(photoPreview.children);
        const index = photosArray.indexOf(photoDiv);

        PhotosUpload.files.splice(index, 1);
        PhotosUpload.input.files = PhotosUpload.getAllFiles();
        photoDiv.remove();
    },


}