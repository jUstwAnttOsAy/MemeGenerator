import React, {Component} from 'react'


class MemeGenerator extends Component{
    state = {
        topText:'',
        bottomText:'',
        randomImgUrl:'http://i.imgflip.com/1bij.jpg',
        allMemeImgs:[]
    }

    handleChange = event=>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }

    handleGenClick = event=>{
        const rNum = Math.floor(Math.random()*this.state.allMemeImgs.length)
        console.log(this.state.allMemeImgs)
        console.log(rNum)
        const rImg = this.state.allMemeImgs[rNum]
        this.setState({
                randomImgUrl:rImg.url
        })
        event.preventDefault()
    }

    // 一進頁面初始化
    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
        .then(response=>response.json())
        .then(response=>{
            const {memes} = response.data
            this.setState({allMemeImgs:memes})
        })
    }

    render(){
        return(
            <div>
                <form className='meme-form' onSubmit={this.handleGenClick}>
                    <input type='text' placeholder='Top Text of Meme' name='topText' onChange={this.handleChange} value={this.state.topText} />
                    <input type='text' placeholder='Bottom Text of Meme' name='bottomText' onChange={this.handleChange} value={this.state.bottomText} />
                    <button>Gen</button>
                </form>
                <div className='meme'>
                    <img src={this.state.randomImgUrl} alt=''/>
                    <h2 className='top'>{this.state.topText}</h2>
                    <h2 className='bottom'>{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator