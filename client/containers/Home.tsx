import * as React from 'react';
import Top from '../components/Top'
type IProps = {

}
type IState = {

}

class Home extends React.Component<IProps, IState>{
    componentDidMount(){
        
    }
    
    render(){
        return <div>
           这是首页
            <Top/>
        </div>
    }
}

export default Home;