import React from 'react'

function Footer() {
    function year(){
        return new Date().getFullYear()
    }
    return (
        <footer style={{ textAlign: 'center'}}>
            <p>Copyright ©️{year()} || Made with ❤️ by <a href="https://t.me/ananhartanto">Anan Hartanto</a></p>
        </footer>
    )
}

export default Footer
