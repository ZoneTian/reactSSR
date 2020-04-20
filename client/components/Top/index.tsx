import * as React from 'react';
import { globalHeight } from '../../actions/global';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { global, IStoreState, Index } from '../../types';
// import {IStoreState} from ''
// type IProps = {}
// 创建类型接口
type IProps = {
    global?: global;
    globalHeight?: (height: number) => void;
    index?: Index;
};
const initialState = { confirmDirty: 'C' };
type IState = Readonly<typeof initialState>;

class Top extends React.Component<IProps, IState> {
    state: IState = initialState;

    componentDidMount() {
        const { globalHeight } = this.props;
        console.log(globalHeight);
        globalHeight && globalHeight(230);
        this.setState({
            confirmDirty: 'B',
        });
    }

    render() {
        let { confirmDirty } = this.state;
        const { global } = this.props;
        return (
            <div id="top">
                {confirmDirty} <div>{global?.height}</div>
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreState): { global: any; index: any } => ({
    global: state.global,
    index: state.index,
    // Index:state
});

// 将 对应action 插入到组件的 props 中
const mapDispatchToProps = (
    dispatch: Dispatch,
): {
    globalHeight: (heihgt: number) => void;
} => ({
    globalHeight: (heihgt: number) => dispatch(globalHeight(heihgt)),
});

// export default Top
export default connect(mapStateToProps, mapDispatchToProps)(Top);
