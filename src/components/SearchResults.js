import React from "react";
import styled from "styled-components";
import { withRouter, Link } from "react-router-dom";
import { GoStar as StarIcon, GoRepoForked as ForkIcon } from "react-icons/go";

const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

const List = styled.div``;

const StyledLink = styled(Link)`
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: #0d4436;

  &:hover {
    text-decoration: underline;
  }
`;
const Repo = styled.div`
  padding: 1rem 0 1rem 0;
  border-bottom: 1px solid black;
`;

const Description = styled.div`
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Stars = styled.div`
  font-size: 0.7rem;
`;
const Forks = styled.div`
  font-size: 0.7rem;
`;
const Language = styled.div``;
const UpdatedAt = styled.div``;
const Details = styled.div`
  font-size: 0.7rem;
  display: flex;
  gap: 1rem;
  line-height: 1.25rem;
`;

function SearchResults({ filteredResults, data }) {
  
  const handleSave = (updated_at,
    full_name,
    id,
    description,
    open_issues,
    visibility,
    html_url) => {

    let newItem = {
      updated_at: updated_at,
      full_name: full_name,
      id: id,
      description: description,
      open_issues: open_issues,
      visibility: visibility,
      html_url: html_url
    }

    let newRepoList = JSON.parse(localStorage.getItem("repoList"));
    if(newRepoList == null) newRepoList = [];
    
    // Save repoList back to local storage
    newRepoList.push(newItem);
    localStorage.setItem("repoList", JSON.stringify(newRepoList));
    console.log(localStorage.getItem("repoList"));
    alert("saved!")
  }




  return (
    <Results>
      <List>
        {(filteredResults ? filteredResults?.items : data?.items || []).map(
          (r) => {
            const {
              forks_count,
              stargazers_count,
              language,
              updated_at,
              full_name,
              id,
              description,
              open_issues,
              visibility,
              html_url
            } = r;
            let updatedAt = new Date(updated_at).toDateString();
            return (
              <Repo key={id}>
                <StyledLink
                  to={{
                    pathname: `/repository/${id}`,
                    state: { data: r, updatedAt: updatedAt },
                  }}
                >
                  {full_name}
                </StyledLink>
                {description && <Description>{r.description}</Description>}
                <Details>
                  <Stars>
                    <StarIcon />
                    {stargazers_count || 0}
                  </Stars>
                  <Forks>
                    <ForkIcon />
                    {forks_count || 0}
                  </Forks>
                  {language && <Language>{language || ""}</Language>}
                  <UpdatedAt>
                    {updatedAt ? `Updated ${updatedAt}` : ""}
                  </UpdatedAt>
                  <button style={{backgroundColor:"#8f0052", color:"#ffff",
                  border:"1px solid white", width:"4rem", cursor:"pointer"}}
                    onClick={
                      () => handleSave(updated_at,
              full_name,
              id,
              description,
              open_issues,
              visibility,
              html_url)
                    }
                  >
                    save
                  </button>
                </Details>
              </Repo>
            );
          }
        )}
      </List>
    </Results>
  );
}

export default withRouter(SearchResults);
