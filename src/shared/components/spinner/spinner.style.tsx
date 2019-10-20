import styled from 'styled-components';
import { themeColor } from 'src/shared/themes/colors';

export const DualRing = styled.div`
	width: 100%;
	height: 64px;
	margin: auto;
	position: absolute;
	top: 50%;
	transform: translateY(-50%);

	:after {
		content: '';
		display: block;
		width: 3rem;
		height: 3rem;
		margin: auto;
		border-radius: 50%;
		opacity: 0.4;
		border: 5px solid ${themeColor.purple};
		border-color: ${themeColor.purple} transparent ${themeColor.purple}
			transparent;
		animation: lds-dual-ring 1.2s linear infinite;
	}

	@keyframes lds-dual-ring {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
