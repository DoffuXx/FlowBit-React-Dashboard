import axios from "axios";
import { fetchArticles } from "../src/api/blog";

jest.mock("axios");

describe("fetchArticles", () => {
  const setArticles = jest.fn();
  const setLoading = jest.fn();
  const setError = jest.fn();
  const setPageInfo = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch articles data correctly", async () => {
    const pageInfoCurrent = 1;
    const mockArticleData = {
      data: {
        "hydra:member": [
          {
            id: "1",
            title: "Article 1",
            content: "Content 1",
            imageName: "image1.jpg",
            createdAt: "2021-09-01T00:00:00+00:00",
            updatedAt: "2021-09-01T00:00:00+00:00",
            TitreArabe: " titre 1",
            contenuArabe: "المحتوى 1",
          },
        ],
        "hydra:totalItems": 100,
        "hydra:view": {
          "hydra:next": "/posts?page=2",
          "hydra:previous": null,
        },
      },
    };
    (axios.get as jest.Mock).mockResolvedValueOnce(mockArticleData);
    await fetchArticles(
      setArticles,
      setLoading,
      setError,
      pageInfoCurrent,
      setPageInfo,
      "",
      "",
    );
    expect(setArticles).toHaveBeenCalledWith(
      mockArticleData.data["hydra:member"],
    );
    expect(setLoading).toHaveBeenCalledTimes(2);
    expect(setLoading).toHaveBeenCalledWith(false);
    expect(setError).toHaveBeenCalledWith("");
  });
});
