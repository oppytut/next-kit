import React, { Component } from 'react'; // Must be in scope
import { Card } from 'antd';
import styled, { injectGlobal } from 'styled-components';
import NunitoSansFont from '../static/fonts/NunitoSans/NunitoSans-Regular.ttf';
import FlamencoFont from '../static/fonts/Flamenco/Flamenco-Regular.ttf';
import bodyStyle from '../pages/bodyStyle';

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
	font-family: ${bodyStyle.fontFamily};
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
