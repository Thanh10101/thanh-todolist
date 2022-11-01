import React, { useEffect } from "react";
import "./../images/avatar.jpg";

function About(props) {
    useEffect(() => {
        document.title = "Gới thiệu về Thành";
    }, []);

    return ( <
        div className = "About" >
        <
        h1 > to do lisst < /h1> <
        p className = "thongtin" > Họ và tên sinh viên: Nguyễn Trịnh Thành < /p> <
        p className = "thongtin" > MS sinh viên: 46.01 .104 .169 < /p> <
        p className = "thongtin" > E - mail: trinhthanh20022 @gmail.com < /p> 
        < img src="avatar.jpg" />

        <
        /div>
    );
}

export default About;