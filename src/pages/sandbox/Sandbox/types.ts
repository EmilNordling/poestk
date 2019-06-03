import { RouteComponentProps } from 'react-router';

export namespace SandboxComponent {
	export interface Props extends RouteComponentProps<{ id: string }> { }

	export interface Style { }
}
