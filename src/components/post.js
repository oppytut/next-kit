import React, { Component } from 'react'; // must be in scope
import { Card } from 'antd';
import styled, { injectGlobal } from 'styled-components';

// static file
import NunitoSansFont from '../static/fonts/NunitoSans/NunitoSans-Regular.ttf';
import FlamencoFont from '../static/fonts/Flamenco/Flamenco-Regular.ttf';

// style
import style from '../pages/style';

// inject to CSS
injectGlobal`
	@font-face {
		font-family: NunitoSans-Regular;
		src: url('${NunitoSansFont}');
	}
	@font-face {
		font-family: Flamenco-Regular;
		src: url('${FlamencoFont}');
	}
`;

// styled component
const StyledContent = styled.div`
	font-family: Flamenco-Regular;
	font-size: 28px;
	letter-spacing: 0.5px;
	text-align: center;
`;

const StyledInventor = styled.div`
	margin-top: 15px;
	font-size: 12px;
	text-align: center;
	font-family: ${style.body.fontFamily};
`;

class Post extends Component {
	render() {
		return (
			<React.Fragment>
				<Card className={this.props.className}>
					<StyledContent>
						Sesungguhnya, shalat seseorang yang paling utama adalah di rumahnya, kecuali shalat fardu.
					</StyledContent>
					<StyledInventor>
						HR. Al-Bukhari (731) dan Muslim (781)
					</StyledInventor>
				</Card>
			</React.Fragment>
		);
	}
}

export default Post;
