import styled from "styled-components";

export const BlogPost = styled.div`
  h1.title {
    font-weight: bold;
    font-size: 3.6rem;
    line-height: 1.43;
    color: #fff;
    margin: 1rem 0;
  }

  .tags {
    display: flex;
    align-items: center;
    margin: 1rem 0;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1.21;
    color: chartreuse;

    .tag {
      margin-left: 1rem;
      color: #fff;
    }
  }

  p.date {
    display: inline-block;
    font-weight: bold;
    font-size: 1.6rem;
    line-height: 1.21;
    background-color: #000;
    color: #fff;
    padding: 0.5rem;
    margin: 1rem 0;
  }

  .post-body {
    * {
      padding: 1rem 0;
    }

    h1 {
      font-weight: bold;
      font-size: 1.6rem;
      line-height: 1.43;
      font-style: italic;
      color: gold;
    }

    p {
      font-size: 1.4rem;
      line-height: 1.6;
      color: #fff;
    }

    pre {
      background: #000;
      padding: 2rem;
      code {
        color: #fff;
      }
    }
  }
`;
