import React, { Component } from 'react'; // must be in scope
import { Pagination, Icon, message } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'is-empty';

import mzLogger from '../helpers/mz-logger';

import Quote from '../components/quote';

import style from '../pages/style';

import {
	setQuotes,
	getQuotes,
} from '../reducers/quote/action';

const log = mzLogger('QuoteList');

const StyledPagination = styled(Pagination)`
	margin-top: 10px;
`;

const Loading = styled.div`
	margin-top: 10px;
	font-size: 30px;
	color: ${style.globalColor.hover};
	text-align: center;
`;

class QuoteList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			page: {
				current: 1,
				size: 5,
			},
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.getQuotes()
			.then((res) => {
				this.props.setQuotes(res.quotes);
			})
			.catch((err) => {
				if (!isEmpty(err.message)) message.error(err.message); // global err
			})
			.finally(() => {
				this.setState({ loading: false });
			});
	}

	changePage(next) {
		const { page } = this.state;

		page.current = next;
		this.setState({ page });

		log.info(`change current page state to ${next}`);
	}

	render() {
		const { loading, page } = this.state;
		const { quote } = this.props;

		return (
			<React.Fragment>
				{loading ? (
					<React.Fragment>
						<Loading>
							<Icon type="loading" />
						</Loading>
					</React.Fragment>
				) : (
					<React.Fragment>
						{/* immutable */}
						{[...quote].reverse().slice((page.current - 1) * page.size, page.current * page.size).map((item, index) => (
							<Quote
								key={index}
								id={item.id}
								content={item.content}
								inventor={item.inventor}
							/>
						))}
						<StyledPagination
							current={page.current}
							pageSize={page.size}
							total={quote.length}
							onChange={this.changePage.bind(this)}
						/>
					</React.Fragment>
				)}
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	quote: state.quote,
});

QuoteList.propTypes = {
	setQuotes: PropTypes.func.isRequired,
	getQuotes: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
	setQuotes: quotes => dispatch(setQuotes(quotes)),
	getQuotes,
});

const ConnectedQuoteList = connect(mapStateToProps, mapDispatchToProps)(QuoteList);

export default ConnectedQuoteList;
