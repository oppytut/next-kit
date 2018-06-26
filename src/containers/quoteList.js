import React, { Component } from 'react'; // must be in scope
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mzLogger from '../libs/mz-logger';

import Quote from '../components/quote';

import {
	setQuotes,
	getQuotes,
} from '../reducers/quote/action';

const log = mzLogger('QuoteList');

const StyledPagination = styled(Pagination)`
	margin-top: 10px
`;

class QuoteList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			page: {
				current: 1,
				size: 5,
			},
		};
	}

	componentDidMount() {
		this.props.getQuotes().then((res) => {
			this.props.setQuotes(res.quotes);
		});
	}

	changePage(next) {
		const { page } = this.state;

		page.current = next;
		log.info(`change current page state to ${next}`);
		this.setState({ page });
	}

	render() {
		const { page } = this.state;
		const { quote } = this.props;

		return (
			<React.Fragment>
				{/* immutable */}
				{[...quote].reverse().slice((page.current - 1) * page.size, page.current * page.size).map((item, index) => (
					<Quote key={index} id={item.id} content={item.content} inventor={item.inventor} />
				))}
				<StyledPagination
					current={page.current}
					pageSize={page.size}
					total={quote.length}
					onChange={this.changePage.bind(this)}
				/>
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
