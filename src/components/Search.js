import React, { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import SearchBar from "./SearchBar";

import SearchResults from "./SearchResults";
import { Spinner } from "react-spinners-css";
import { withRouter, Link, useParams, Redirect, useHistory } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import {
  GoChevronLeft as LeftIcon,
  GoChevronRight as RightIcon,
} from "react-icons/go";


import { DivFlexCenter } from "../globals/styles";
import { getUserFromLocalStorage } from "../services/auth";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    align-items: left;
    justify-content: space-between;
    background-color: ${theme.colors.secondary};
    padding: 1rem;
    color: ${theme.colors.primary};
  `}
`;

const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    padding: 0.25rem;
    color: ${theme.colors.secondary};
    cursor: pointer;

    &:hover {
      border-radius: 10px;
      padding: 0.25rem;
      border: 1px solid ${theme.colors.secondary};
    }
  `}
`;

const IconLink = styled(Link)`
  ${({ theme }) => css`
    text-decoration: none;
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    color: ${theme.colors.primary};
  `}
`;

const ResultsWrapper = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

const TotalResults = styled.div`
  ${({ theme }) => css`
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: left;
  `}
`;
const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 75%;

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const Loading = styled(DivFlexCenter)`
  height: 50vh;
  top: 25%;
  left: 50%;
`;

const Dropdowns = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  @media screen and (max-width: 800px) {
    gap: 0;
    justify-content: space-between;
  }
`;

const Pagination = styled(DivFlexCenter)`
  gap: 2rem;
  padding: 1rem;
  font-size: 0.8rem;
`;

function Search() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filteredResults, setFilteredResults] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [page, setPage] = useState(1);
  const [filterActive, setFilterActive] = useState(false);
  const history = useHistory();

  useEffect(() => {
    let userToken = getUserFromLocalStorage()
    if(!userToken){
    history.push('/login');
    }
    
  }, []);

  //Github Sort Options
  const sortOptions = [
    { label: "Best match", sort: "" },
    { label: "Most stars", sort: "stars" },
    { label: "Fewest stars", sort: "stars", order: "asc" },
    { label: "Most forks", sort: "forks" },
    { label: "Fewest forks", sort: "forks", order: "asc" },
  ];

  //get params from url
  let { q } = useParams();

  const fetchData = useCallback(
    ({ input, sort, order, perPage, pg }) => {
      setLoading(true);

      //Query Parameters - Reference: https://docs.github.com/en/rest/reference/repos
      const queryTerm = `q=` + encodeURIComponent(input || q);
      const querySort = `${sort ? `&sort=${sort}` : ""}`;
      const queryOrder = `${order ? `&order=${order}` : ""}`;
      const queryPerPage = `&per_page=${perPage || 30}`;
      const queryPage = `&page=${page || 1}`;
      const queryString =
        queryTerm + querySort + queryOrder + queryPerPage + queryPage;

      //console.log("Github API Search Query: ", queryString);
      let url = `https://api.github.com/search/repositories?${queryString}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
        
          setData({
            totalCount: data.total_count,
            items: data.items,
         
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
          setError(true);
        });
    },
    [page, q]
  );

  const handleSubmit = (input) => {
    setFilteredResults(null);
    setPage(1);
    fetchData({ input: input });
  };

  
  const handlePagination = (direction) => {
    let offset = page * 31;
    let results = filteredResults
      ? filteredResults?.totalCount
      : data?.totalCount || 0;
    if (direction === "prev" && page >= 2) {
      setPage(page - 1);
    }
    if (direction === "next" && page > 0 && offset < results) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    fetchData({ input: q });
  }, [q, page, fetchData]);

  return (
    <Container id="Search" style={{backgroundColor:"#fa9bfa"}}>
      <Header>
        <IconLink to={`/`}>
          <FaGithub />
        </IconLink>
        <SearchBar placeholder="Search..." onSubmit={handleSubmit} value={q} />
      </Header>
      <ResultsWrapper>
      
        <List>
         
          <TotalResults>
            {filteredResults
              ? filteredResults?.totalCount
              : data?.totalCount || 0}{" "}
            results
          </TotalResults>
          {loading ? (
            <Loading>
              <Spinner color={`#cf9fff`} />
            </Loading>
          ) : data ? (
            <>
              <SearchResults
                filteredResults={filteredResults}
                fetchData={fetchData}
                data={data}
              />
              <Pagination>
                <Icon onClick={() => handlePagination("prev")}>
                  <LeftIcon />
                  Prev
                </Icon>
                Page {page}
                <Icon onClick={() => handlePagination("next")}>
                  Next
                  <RightIcon />
                </Icon>
              </Pagination>
            </>
          ) : null}
        </List>
      </ResultsWrapper>
      {error ? <Redirect to="/error" /> : null}
    </Container>
  );
}

export default withRouter(Search);
