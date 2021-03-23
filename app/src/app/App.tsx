import React from "react";
import styled from "styled-components";

import { Layout, Input, List, Spinner } from "src/components";
import useLocationsApi from "src/hooks/useLocationsApi";

const SpinnerWrapper = styled.div`
    margin-top: 50px;
    width: 350px;
    text-align: center;
`;

const App: React.FC = () => {
    const [ result, setQuery ] = useLocationsApi();

    return (
        <Layout>
            <Input placeholder="Search..." onChange={setQuery} />
            {result.loading && (
                <SpinnerWrapper>
                    <Spinner />
                </SpinnerWrapper>
            )}
            <List locations={result.data} />
        </Layout>
    );
};

export default App;
