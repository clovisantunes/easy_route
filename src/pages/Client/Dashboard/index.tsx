import { useState,useEffect, ChangeEvent } from "react";

import { Navbar } from "@/components/Header";
import Head from "next/head";
import styles from "./styles.module.scss";
import { FaUserCircle } from "react-icons/fa";

export default function Dashboard() {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [imageAvatar, setImageAvatar] = useState(null);

function handleFile(e:ChangeEvent<HTMLInputElement> ){
  if(!e.target.files){
    return;
  }
  const image = e.target.files[0]

  if(!image){
    return;
  }
  if (image.type === 'image/jpeg' || image.type === 'image/png') {
    const imageUrl = URL.createObjectURL(image);
    setImageAvatar(image);
    setAvatarUrl(imageUrl);
   
  }
}


  return (
    <>
      <Head>
        <title>Minhas informações</title>
      </Head>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.containerUser}>
          <div className={styles.userImage}>
            <label className={styles.labelAvatar}>
              <span>
                <FaUserCircle />
              </span>
              <input type="file" accept="image/png, image/jpeg" onChange={handleFile} />
              {avatarUrl && (
                <img
                className={styles.preview}
                  src={avatarUrl}
                  alt="foto do usuario"
                  width={96}
                  height={96}
                />
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
