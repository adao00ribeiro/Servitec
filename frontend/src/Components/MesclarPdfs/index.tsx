import React, { ChangeEvent, MouseEvent, MouseEventHandler, useState } from "react";
import styles from "./styles.module.scss";
import { Input } from "../ui/Input";
import { FiUpload } from "react-icons/fi";
import { PiFileZip } from "react-icons/pi";
import Button from "../ui/Button";
import { api } from "../../services/apiClient";

export default () => {
    const [Inputs, setInputs] = useState({
        imageUrl: "",
        imageAvatar: null,
    });
    const handleFile = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files) {
            return;
        }

        const image = event.target.files[0];
        if (!image) {
            return;
        }

        if (image.type === 'application/x-zip-compressed') {
            setInputs({
                ...Inputs,
                imageUrl: URL.createObjectURL(event.target.files[0]),
                imageAvatar: image
            })
        }
    }
    const handleMesclar = async (event: MouseEvent<HTMLButtonElement>) => {
        if (!Inputs.imageAvatar) {

            return;
        }
        try {

            const data = new FormData();
            data.append('file', Inputs.imageAvatar);
            const response = await api.post('/mesclarpdf', data, {
                responseType: 'blob', // Indica que a resposta é um arquivo binário
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'mesclado.pdf'; // Nome do arquivo para download
            document.body.appendChild(link);
            link.click();
            URL.revokeObjectURL(url);
            //  toast.success(response.data.name + ' registrado');

        } catch (e) {
            //toast.error(e.response.data.message);

            alert(e?.response?.data?.message)

        }

    }
    return (
        <div className={styles.container}>
            <h1>Mesclar Pdfs </h1>
            <label className={styles.labelAvatar}>
                {Inputs.imageUrl ? (
                    <span>
                        <PiFileZip size={30} color="FFF" />
                    </span>
                ) : (
                    <span>
                        <FiUpload size={30} />
                    </span>
                )}
                <input type="file" name='inputFile' accept=".zip" onChange={handleFile} />
            </label>
            <Button onClick={handleMesclar}>Mesclar</Button>
        </div>
    )
}