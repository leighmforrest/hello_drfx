from urllib.parse import urlencode
from rest_framework.pagination import LimitOffsetPagination


class StandardPaginationClass(LimitOffsetPagination):
    default_limit = 6

    def get_next_link(self):
        if self.count is None or self.offset + self.limit >= self.count:
            return None

        url = self.request.path
        query_params = self.request.query_params.copy()
        query_params[self.limit_query_param] = self.limit
        query_params[self.offset_query_param] = self.offset + self.limit

        return f"{url}?{urlencode(query_params)}"

    def get_previous_link(self):
        if self.count is None or self.offset <= 0:
            return None

        url = self.request.path
        previous_offset = max(self.offset - self.limit, 0)
        query_params = self.request.query_params.copy()
        query_params[self.limit_query_param] = self.limit

        if previous_offset > 0:
            query_params[self.offset_query_param] = previous_offset
            return f"{url}?{urlencode(query_params)}"
        else:
            # No offset parameter for first page
            return f"{url}?{urlencode(query_params)}" if query_params else url


class CommentsPaginationClass(StandardPaginationClass):
    default_limit = 10
