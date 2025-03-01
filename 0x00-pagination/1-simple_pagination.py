#!/usr/bin/env python3
"""
Simple pagination implementation
"""
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate the start and end indexes for pagination parameters.
    
    Args:
        page (int): The current page number (1-indexed)
        page_size (int): The number of items per page
        
    Returns:
        tuple: A tuple of (start_index, end_index) for the given pagination parameters
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Retrieve a specific page of data from the dataset.
        
        Args:
            page (int): Page number (1-indexed)
            page_size (int): Number of items per page
            
        Returns:
            List[List]: Page of data
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0
        
        dataset = self.dataset()
        try:
            start_idx, end_idx = index_range(page, page_size)
            return dataset[start_idx:end_idx]
        except IndexError:
            return []
