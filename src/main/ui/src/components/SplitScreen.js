import styled from "styled-components";

const Container = styled.div`
    display: flex;  
`;

const Pane = styled.div`
    flex: ${props => props.weight};
`;

export const SplitScreen = ({
    children,
    leftSpace=1,
    rightSpace=1
}) => {
    const[left, right] = children
    return (
        <Container>
            <Pane weight={leftSpace}>
                {left}
            </Pane>
            <Pane weight={rightSpace}>
                {right}
            </Pane>
        </Container>
    );
}
