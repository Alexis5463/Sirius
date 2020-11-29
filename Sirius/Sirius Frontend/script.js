class JinguLogo extends React.Component {
    render() {
        return <img class="logo" src="https://www.jingu.ru/sirius/jingu-logo-512.png" alt="logo"/>;
    }
}


class NameText extends React.Component {
    render() {
        return <h1 class="myname" >Isakov Alexander</h1> ;
    }
}

class Emoji extends React.Component {
    render() {
        return <img class="emoji" src="https://static.tildacdn.com/tild6366-3464-4634-b034-666334646662/s1200.png" alt="logo"/> ;
    }
}

ReactDOM.render
((<div>
    <NameText/>
    <JinguLogo/>
    <Emoji/>
</div>), document.getElementById("body"))
