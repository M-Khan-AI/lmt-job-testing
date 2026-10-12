/**
 * Dedicated Topic-Wise DSA Preparation Sheet
 * Comprehensive curated problems across 12 core algorithmic categories with multi-language solutions (C++, Java, Python),
 * complexity analysis, hints, and practice links.
 */

const DSA_SHEET_DATA = [
  // --- TOPIC 1: ARRAYS ---
  {
    id: "dsa-arr-1",
    topic: "Arrays",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google"],
    leetcodeUrl: "https://leetcode.com/problems/set-matrix-zeroes/",
    description: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
    intuition: "Instead of allocating an extra O(M*N) matrix or O(M+N) arrays, use the first row and first column of the matrix itself as markers. Keep one variable `col0` for the 0th column status.",
    timeComplexity: "O(2 * M * N)",
    spaceComplexity: "O(1) auxiliary space",
    solutions: {
      cpp: `void setZeroes(vector<vector<int>>& matrix) {
    int n = matrix.size(), m = matrix[0].size();
    int col0 = 1;
    for (int i = 0; i < n; i++) {
        if (matrix[i][0] == 0) col0 = 0;
        for (int j = 1; j < m; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (int i = n - 1; i >= 0; i--) {
        for (int j = m - 1; j >= 1; j--) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        }
        if (col0 == 0) matrix[i][0] = 0;
    }
}`,
      java: `public void setZeroes(int[][] matrix) {
    int n = matrix.length, m = matrix[0].length;
    int col0 = 1;
    for (int i = 0; i < n; i++) {
        if (matrix[i][0] == 0) col0 = 0;
        for (int j = 1; j < m; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (int i = n - 1; i >= 0; i--) {
        for (int j = m - 1; j >= 1; j--) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
        }
        if (col0 == 0) matrix[i][0] = 0;
    }
}`,
      python: `def setZeroes(matrix: list[list[int]]) -> None:
    n, m = len(matrix), len(matrix[0])
    col0 = 1
    for i in range(n):
        if matrix[i][0] == 0:
            col0 = 0
        for j in range(1, m):
            if matrix[i][j] == 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    for i in range(n - 1, -1, -1):
        for j in range(m - 1, 0, -1):
            if matrix[i][0] == 0 or matrix[0][j] == 0:
                matrix[i][j] = 0
        if col0 == 0:
            matrix[i][0] = 0`
    }
  },
  {
    id: "dsa-arr-2",
    topic: "Arrays",
    title: "Maximum Subarray (Kadane's Algorithm)",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "TCS", "Infosys"],
    leetcodeUrl: "https://leetcode.com/problems/maximum-subarray/",
    description: "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    intuition: "Maintain a running sum. If the running sum drops below 0, reset it to 0 because adding a negative sum to subsequent elements will only decrease their overall value.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `int maxSubArray(vector<int>& nums) {
    int maxi = INT_MIN, sum = 0;
    for (int x : nums) {
        sum += x;
        maxi = max(maxi, sum);
        if (sum < 0) sum = 0;
    }
    return maxi;
}`,
      java: `public int maxSubArray(int[] nums) {
    int maxi = Integer.MIN_VALUE, sum = 0;
    for (int x : nums) {
        sum += x;
        maxi = Math.max(maxi, sum);
        if (sum < 0) sum = 0;
    }
    return maxi;
}`,
      python: `def maxSubArray(nums: list[int]) -> int:
    maxi = float('-inf')
    cur = 0
    for x in nums:
        cur += x
        maxi = max(maxi, cur)
        if cur < 0:
            cur = 0
    return maxi`
    }
  },
  {
    id: "dsa-arr-3",
    topic: "Arrays",
    title: "Sort Colors (Dutch National Flag Algorithm)",
    difficulty: "Medium",
    companies: ["Microsoft", "Adobe", "Cognizant"],
    leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
    description: "Given an array nums with n objects colored red, white, or blue (represented by 0, 1, and 2), sort them in-place so that objects of the same color are adjacent.",
    intuition: "Use 3 pointers: low, mid, high. Everything to the left of low is 0; everything to the right of high is 2; between low and mid is 1.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `void sortColors(vector<int>& nums) {
    int low = 0, mid = 0, high = nums.size() - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums[low++], nums[mid++]);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums[mid], nums[high--]);
        }
    }
}`,
      java: `public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            int t = nums[low]; nums[low++] = nums[mid]; nums[mid++] = t;
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            int t = nums[mid]; nums[mid] = nums[high]; nums[high--] = t;
        }
    }
}`,
      python: `def sortColors(nums: list[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`
    }
  },
  {
    id: "dsa-arr-4",
    topic: "Arrays",
    title: "Next Permutation",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/next-permutation/",
    description: "A permutation of an array of integers is an arrangement of its members into a sequence. Find the next lexicographically greater permutation of numbers.",
    intuition: "1) Find longest prefix match (break point index `i` from right where `arr[i] < arr[i+1]`). 2) Find smallest number greater than `arr[i]` on its right and swap them. 3) Reverse the remaining subarray to the right of `i`.",
    timeComplexity: "O(3 * N) = O(N)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `void nextPermutation(vector<int>& nums) {
    int n = nums.size(), i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        swap(nums[i], nums[j]);
    }
    reverse(nums.begin() + i + 1, nums.end());
}`,
      java: `public void nextPermutation(int[] nums) {
    int n = nums.length, i = n - 2;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    if (i >= 0) {
        int j = n - 1;
        while (nums[j] <= nums[i]) j--;
        int temp = nums[i]; nums[i] = nums[j]; nums[j] = temp;
    }
    reverse(nums, i + 1, n - 1);
}`,
      python: `def nextPermutation(nums: list[int]) -> None:
    n = len(nums)
    i = n - 2
    while i >= 0 and nums[i] >= nums[i + 1]:
        i -= 1
    if i >= 0:
        j = n - 1
        while nums[j] <= nums[i]:
            j -= 1
        nums[i], nums[j] = nums[j], nums[i]
    nums[i + 1:] = reversed(nums[i + 1:])`
    }
  },

  // --- TOPIC 2: STRINGS ---
  {
    id: "dsa-str-1",
    topic: "Strings",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Accenture"],
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    intuition: "Use sliding window with two pointers `left` and `right`. Maintain a hash map of characters to their most recent index. When a duplicate is found within current window, jump `left` past the duplicate.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(min(N, 256))",
    solutions: {
      cpp: `int lengthOfLongestSubstring(string s) {
    vector<int> mpp(256, -1);
    int left = 0, right = 0, n = s.size(), len = 0;
    while (right < n) {
        if (mpp[s[right]] != -1) left = max(mpp[s[right]] + 1, left);
        mpp[s[right]] = right;
        len = max(len, right - left + 1);
        right++;
    }
    return len;
}`,
      java: `public int lengthOfLongestSubstring(String s) {
    int[] mpp = new int[256];
    Arrays.fill(mpp, -1);
    int left = 0, right = 0, n = s.length(), len = 0;
    while (right < n) {
        if (mpp[s.charAt(right)] != -1) left = Math.max(mpp[s.charAt(right)] + 1, left);
        mpp[s.charAt(right)] = right;
        len = Math.max(len, right - left + 1);
        right++;
    }
    return len;
}`,
      python: `def lengthOfLongestSubstring(s: str) -> int:
    char_map = {}
    left = 0
    max_len = 0
    for right, ch in enumerate(s):
        if ch in char_map and char_map[ch] >= left:
            left = char_map[ch] + 1
        char_map[ch] = right
        max_len = max(max_len, right - left + 1)
    return max_len`
    }
  },
  {
    id: "dsa-str-2",
    topic: "Strings",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Infosys"],
    leetcodeUrl: "https://leetcode.com/problems/longest-palindromic-substring/",
    description: "Given a string s, return the longest palindromic substring in s.",
    intuition: "Expand around center. For each character i, expand outward for odd-length palindromes (center i) and even-length palindromes (center i and i+1).",
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `string longestPalindrome(string s) {
    if (s.empty()) return "";
    int start = 0, maxLen = 1, n = s.size();
    auto expand = [&](int l, int r) {
        while (l >= 0 && r < n && s[l] == s[r]) {
            if (r - l + 1 > maxLen) {
                start = l;
                maxLen = r - l + 1;
            }
            l--; r++;
        }
    };
    for (int i = 0; i < n; i++) {
        expand(i, i);
        expand(i, i + 1);
    }
    return s.substr(start, maxLen);
}`,
      java: `public String longestPalindrome(String s) {
    if (s == null || s.length() < 1) return "";
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        int len1 = expandAroundCenter(s, i, i);
        int len2 = expandAroundCenter(s, i, i + 1);
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
    }
    return s.substring(start, end + 1);
}
private int expandAroundCenter(String s, int left, int right) {
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        left--; right++;
    }
    return right - left - 1;
}`,
      python: `def longestPalindrome(s: str) -> str:
    res = ""
    for i in range(len(s)):
        # odd length
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res):
                res = s[l:r+1]
            l -= 1; r += 1
        # even length
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > len(res):
                res = s[l:r+1]
            l -= 1; r += 1
    return res`
    }
  },

  // --- TOPIC 3: TWO POINTERS & SLIDING WINDOW ---
  {
    id: "dsa-tp-1",
    topic: "Two Pointers & Sliding Window",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    companies: ["Amazon", "Google", "Microsoft", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/trapping-rain-water/",
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    intuition: "Two pointers approach: track `leftMax` and `rightMax`. At any index, trapped water is bounded by `min(leftMax, rightMax) - height[i]`. We can safely process the smaller of `height[left]` and `height[right]`.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `int trap(vector<int>& height) {
    int n = height.size(), l = 0, r = n - 1;
    int leftMax = 0, rightMax = 0, res = 0;
    while (l <= r) {
        if (height[l] <= height[r]) {
            if (height[l] >= leftMax) leftMax = height[l];
            else res += leftMax - height[l];
            l++;
        } else {
            if (height[r] >= rightMax) rightMax = height[r];
            else res += rightMax - height[r];
            r--;
        }
    }
    return res;
}`,
      java: `public int trap(int[] height) {
    int n = height.length, l = 0, r = n - 1;
    int leftMax = 0, rightMax = 0, res = 0;
    while (l <= r) {
        if (height[l] <= height[r]) {
            if (height[l] >= leftMax) leftMax = height[l];
            else res += leftMax - height[l];
            l++;
        } else {
            if (height[r] >= rightMax) rightMax = height[r];
            else res += rightMax - height[r];
            r--;
        }
    }
    return res;
}`,
      python: `def trap(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    left_max, right_max = 0, 0
    res = 0
    while l <= r:
        if height[l] <= height[r]:
            if height[l] >= left_max:
                left_max = height[l]
            else:
                res += left_max - height[l]
            l += 1
        else:
            if height[r] >= right_max:
                right_max = height[r]
            else:
                res += right_max - height[r]
            r -= 1
    return res`
    }
  },
  {
    id: "dsa-tp-2",
    topic: "Two Pointers & Sliding Window",
    title: "3Sum",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Adobe"],
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
    description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
    intuition: "Sort the array. Fix the first element with pointer `i` (skip duplicates). Then use two pointers `j = i + 1` and `k = n - 1` to find pairs whose sum equals `-nums[i]`.",
    timeComplexity: "O(N^2)",
    spaceComplexity: "O(1) excluding output",
    solutions: {
      cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    int n = nums.size();
    for (int i = 0; i < n; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int j = i + 1, k = n - 1;
        while (j < k) {
            int sum = nums[i] + nums[j] + nums[k];
            if (sum < 0) j++;
            else if (sum > 0) k--;
            else {
                res.push_back({nums[i], nums[j], nums[k]});
                j++; k--;
                while (j < k && nums[j] == nums[j - 1]) j++;
                while (j < k && nums[k] == nums[k + 1]) k--;
            }
        }
    }
    return res;
}`,
      java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> res = new ArrayList<>();
    for (int i = 0; i < nums.length; i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int j = i + 1, k = nums.length - 1;
        while (j < k) {
            int sum = nums[i] + nums[j] + nums[k];
            if (sum < 0) j++;
            else if (sum > 0) k--;
            else {
                res.add(Arrays.asList(nums[i], nums[j], nums[k]));
                j++; k--;
                while (j < k && nums[j] == nums[j - 1]) j++;
                while (j < k && nums[k] == nums[k + 1]) k--;
            }
        }
    }
    return res;
}`,
      python: `def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    res = []
    n = len(nums)
    for i in range(n):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        j, k = i + 1, n - 1
        while j < k:
            s = nums[i] + nums[j] + nums[k]
            if s < 0:
                j += 1
            elif s > 0:
                k -= 1
            else:
                res.append([nums[i], nums[j], nums[k]])
                j += 1
                k -= 1
                while j < k and nums[j] == nums[j - 1]:
                    j += 1
                while j < k and nums[k] == nums[k + 1]:
                    k -= 1
    return res`
    }
  },

  // --- TOPIC 4: LINKED LISTS ---
  {
    id: "dsa-ll-1",
    topic: "Linked Lists",
    title: "Reverse a Linked List",
    difficulty: "Easy",
    companies: ["Microsoft", "Amazon", "TCS", "Accenture"],
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    intuition: "Maintain three pointers: `prev` initialized to null, `curr` initialized to head, and `front` to keep track of `curr.next` before reversing the arrow pointer.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(1)",
    solutions: {
      cpp: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *curr = head;
    while (curr) {
        ListNode* front = curr->next;
        curr->next = prev;
        prev = curr;
        curr = front;
    }
    return prev;
}`,
      java: `public ListNode reverseList(ListNode head) {
    ListNode prev = null, curr = head;
    while (curr != null) {
        ListNode front = curr.next;
        curr.next = prev;
        prev = curr;
        curr = front;
    }
    return prev;
}`,
      python: `def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        front = curr.next
        curr.next = prev
        prev = curr
        curr = front
    return prev`
    }
  },
  {
    id: "dsa-ll-2",
    topic: "Linked Lists",
    title: "LRU Cache (Least Recently Used)",
    difficulty: "Medium",
    companies: ["Google", "Amazon", "Microsoft", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/lru-cache/",
    description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put operations.",
    intuition: "Combine a Hash Map (for O(1) key-to-node lookup) and a Doubly Linked List with dummy Head and Tail nodes (for O(1) node insertion at head and deletion at tail).",
    timeComplexity: "O(1) for both get() and put()",
    spaceComplexity: "O(Capacity)",
    solutions: {
      cpp: `class LRUCache {
    struct Node {
        int key, val;
        Node *prev, *next;
        Node(int k, int v) : key(k), val(v), prev(nullptr), next(nullptr) {}
    };
    int cap;
    unordered_map<int, Node*> mp;
    Node *head, *tail;
    void addNode(Node* node) {
        node->next = head->next;
        node->prev = head;
        head->next->prev = node;
        head->next = node;
    }
    void deleteNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }
public:
    LRUCache(int capacity) : cap(capacity) {
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head->next = tail;
        tail->prev = head;
    }
    int get(int key) {
        if (mp.find(key) == mp.end()) return -1;
        Node* node = mp[key];
        deleteNode(node);
        addNode(node);
        return node->val;
    }
    void put(int key, int value) {
        if (mp.find(key) != mp.end()) {
            deleteNode(mp[key]);
            mp.erase(key);
        }
        if (mp.size() == cap) {
            mp.erase(tail->prev->key);
            deleteNode(tail->prev);
        }
        Node* newNode = new Node(key, value);
        addNode(newNode);
        mp[key] = newNode;
    }
};`,
      java: `class LRUCache {
    class Node {
        int key, val;
        Node prev, next;
        Node(int k, int v) { key = k; val = v; }
    }
    Map<Integer, Node> map = new HashMap<>();
    int capacity;
    Node head, tail;
    public LRUCache(int capacity) {
        this.capacity = capacity;
        head = new Node(-1, -1);
        tail = new Node(-1, -1);
        head.next = tail;
        tail.prev = head;
    }
    private void add(Node node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }
    private void remove(Node node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }
    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        add(node);
        return node.val;
    }
    public void put(int key, int value) {
        if (map.containsKey(key)) remove(map.get(key));
        if (map.size() == capacity) {
            map.remove(tail.prev.key);
            remove(tail.prev);
        }
        Node node = new Node(key, value);
        add(node);
        map.put(key, node);
    }
}`,
      python: `class Node:
    def __init__(self, key, val):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(0, 0), Node(0, 0)
        self.head.next = self.tail
        self.tail.prev = self.head

    def remove(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def insert(self, node):
        node.next = self.head.next
        node.prev = self.head
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key in self.cache:
            self.remove(self.cache[key])
            self.insert(self.cache[key])
            return self.cache[key].val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.remove(self.cache[key])
        self.cache[key] = Node(key, value)
        self.insert(self.cache[key])
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self.remove(lru)
            del self.cache[lru.key]`
    }
  },

  // --- TOPIC 5: STACKS & QUEUES ---
  {
    id: "dsa-sq-1",
    topic: "Stacks & Queues",
    title: "Valid Parentheses",
    difficulty: "Easy",
    companies: ["Amazon", "Microsoft", "TCS", "Infosys"],
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    intuition: "Use a Stack. Push opening brackets. When a closing bracket is seen, verify the top of the stack matches the closing type and pop; if mismatch or stack is empty, return false.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(N)",
    solutions: {
      cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            char top = st.top(); st.pop();
            if ((c == ')' && top != '(') || 
                (c == '}' && top != '{') || 
                (c == ']' && top != '[')) return false;
        }
    }
    return st.empty();
}`,
      java: `public boolean isValid(String s) {
    Stack<Character> st = new Stack<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.isEmpty()) return false;
            char top = st.pop();
            if ((c == ')' && top != '(') || 
                (c == '}' && top != '{') || 
                (c == ']' && top != '[')) return false;
        }
    }
    return st.isEmpty();
}`,
      python: `def isValid(s: str) -> bool:
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    for ch in s:
        if ch in mapping:
            top = stack.pop() if stack else '#'
            if mapping[ch] != top:
                return False
        else:
            stack.append(ch)
    return len(stack) == 0`
    }
  },
  {
    id: "dsa-sq-2",
    topic: "Stacks & Queues",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    companies: ["Google", "Amazon", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/largest-rectangle-in-histogram/",
    description: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    intuition: "Use a Monotonic Stack storing indices in increasing order of height. When a smaller bar is encountered, pop elements and calculate the area with the popped element as the limiting height.",
    timeComplexity: "O(2 * N) = O(N)",
    spaceComplexity: "O(N)",
    solutions: {
      cpp: `int largestRectangleArea(vector<int>& heights) {
    stack<int> st;
    int maxA = 0, n = heights.size();
    for (int i = 0; i <= n; i++) {
        while (!st.empty() && (i == n || heights[st.top()] >= heights[i])) {
            int height = heights[st.top()]; st.pop();
            int width = st.empty() ? i : i - st.top() - 1;
            maxA = max(maxA, width * height);
        }
        st.push(i);
    }
    return maxA;
}`,
      java: `public int largestRectangleArea(int[] heights) {
    Stack<Integer> st = new Stack<>();
    int maxA = 0, n = heights.length;
    for (int i = 0; i <= n; i++) {
        while (!st.isEmpty() && (i == n || heights[st.peek()] >= heights[i])) {
            int height = heights[st.pop()];
            int width = st.isEmpty() ? i : i - st.peek() - 1;
            maxA = Math.max(maxA, width * height);
        }
        st.push(i);
    }
    return maxA;
}`,
      python: `def largestRectangleArea(heights: list[int]) -> int:
    stack = []
    max_area = 0
    heights.append(0)
    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] >= h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    return max_area`
    }
  },

  // --- TOPIC 6: TREES & BST ---
  {
    id: "dsa-tree-1",
    topic: "Binary Trees & BST",
    title: "Lowest Common Ancestor of a Binary Tree",
    difficulty: "Medium",
    companies: ["Amazon", "Microsoft", "Google"],
    leetcodeUrl: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/",
    description: "Given a binary tree, find the lowest common ancestor (LCA) of two given nodes p and q.",
    intuition: "Postorder DFS traversal: If current node is null or matches p or q, return current node. Recursively search left and right subtrees. If both return non-null, current node is the LCA.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H) recursion stack",
    solutions: {
      cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    TreeNode* left = lowestCommonAncestor(root->left, p, q);
    TreeNode* right = lowestCommonAncestor(root->right, p, q);
    if (!left) return right;
    if (!right) return left;
    return root;
}`,
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left == null) return right;
    if (right == null) return left;
    return root;
}`,
      python: `def lowestCommonAncestor(root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
    if not root or root == p or root == q:
        return root
    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)
    if not left: return right
    if not right: return left
    return root`
    }
  },
  {
    id: "dsa-tree-2",
    topic: "Binary Trees & BST",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    companies: ["Amazon", "Facebook", "Microsoft"],
    leetcodeUrl: "https://leetcode.com/problems/validate-binary-search-tree/",
    description: "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    intuition: "Check recursively whether every node's value lies strictly within valid range `(minVal, maxVal)`. When going left, update upper bound to `node.val`. When going right, update lower bound to `node.val`.",
    timeComplexity: "O(N)",
    spaceComplexity: "O(H)",
    solutions: {
      cpp: `bool isValidBST(TreeNode* root, long minVal = LONG_MIN, long maxVal = LONG_MAX) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal) return false;
    return isValidBST(root->left, minVal, root->val) && 
           isValidBST(root->right, root->val, maxVal);
}`,
      java: `public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) && validate(node.right, node.val, max);
}`,
      python: `def isValidBST(root: Optional[TreeNode]) -> bool:
    def validate(node, low=float('-inf'), high=float('inf')):
        if not node:
            return True
        if node.val <= low or node.val >= high:
            return False
        return validate(node.left, low, node.val) and validate(node.right, node.val, high)
    return validate(root)`
    }
  },

  // --- TOPIC 7: DYNAMIC PROGRAMMING ---
  {
    id: "dsa-dp-1",
    topic: "Dynamic Programming",
    title: "0/1 Knapsack Problem",
    difficulty: "Medium",
    companies: ["Amazon", "Flipkart", "TCS", "Accenture"],
    leetcodeUrl: "https://www.geeksforgeeks.org/0-1-knapsack-problem-dp-10/",
    description: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack.",
    intuition: "State `dp[i][w]` is the maximum profit considering first `i` items with capacity `w`. At each item, decide to either exclude it (`dp[i-1][w]`) or include it (`val[i] + dp[i-1][w - wt[i]]`). Space-optimize with a single 1D array right-to-left.",
    timeComplexity: "O(N * W)",
    spaceComplexity: "O(W) optimized",
    solutions: {
      cpp: `int knapSack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
      java: `public static int knapSack(int W, int[] wt, int[] val, int n) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < n; i++) {
        for (int w = W; w >= wt[i]; w--) {
            dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);
        }
    }
    return dp[W];
}`,
      python: `def knapSack(W: int, wt: list[int], val: list[int], n: int) -> int:
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, wt[i] - 1, -1):
            dp[w] = max(dp[w], val[i] + dp[w - wt[i]])
    return dp[W]`
    }
  },
  {
    id: "dsa-dp-2",
    topic: "Dynamic Programming",
    title: "Longest Increasing Subsequence (LIS)",
    difficulty: "Medium",
    companies: ["Google", "Microsoft", "Goldman Sachs"],
    leetcodeUrl: "https://leetcode.com/problems/longest-increasing-subsequence/",
    description: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    intuition: "Optimal O(N log N) using Patience Sorting / Binary Search. Maintain an array `tails` where `tails[i]` stores the smallest tail of all increasing subsequences of length `i+1`. Use binary search (lower_bound) to replace or append elements.",
    timeComplexity: "O(N log N)",
    spaceComplexity: "O(N)",
    solutions: {
      cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
      java: `public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int x : nums) {
        int idx = Collections.binarySearch(tails, x);
        if (idx < 0) idx = -(idx + 1);
        if (idx == tails.size()) tails.add(x);
        else tails.set(idx, x);
    }
    return tails.size();
}`,
      python: `import bisect

def lengthOfLIS(nums: list[int]) -> int:
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`
    }
  },

  // --- TOPIC 8: GRAPHS ---
  {
    id: "dsa-graph-1",
    topic: "Graphs",
    title: "Course Schedule (Topological Sort / Cycle Detection)",
    difficulty: "Medium",
    companies: ["Amazon", "Google", "Uber"],
    leetcodeUrl: "https://leetcode.com/problems/course-schedule/",
    description: "There are a total of numCourses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites. Return true if you can finish all courses.",
    intuition: "Model as a Directed Graph. It is possible to complete all courses if and only if the graph has NO directed cycles. Use Kahn's Algorithm (BFS using in-degrees). If the number of processed nodes equals numCourses, no cycle exists.",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V + E)",
    solutions: {
      cpp: `bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
    vector<vector<int>> adj(numCourses);
    vector<int> indegree(numCourses, 0);
    for (auto& pre : prerequisites) {
        adj[pre[1]].push_back(pre[0]);
        indegree[pre[0]]++;
    }
    queue<int> q;
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.push(i);
    }
    int count = 0;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        count++;
        for (int neighbor : adj[node]) {
            if (--indegree[neighbor] == 0) q.push(neighbor);
        }
    }
    return count == numCourses;
}`,
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    int[] indegree = new int[numCourses];
    for (int[] pre : prerequisites) {
        adj.get(pre[1]).add(pre[0]);
        indegree[pre[0]]++;
    }
    Queue<Integer> q = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) q.offer(i);
    }
    int count = 0;
    while (!q.isEmpty()) {
        int node = q.poll();
        count++;
        for (int neighbor : adj.get(node)) {
            if (--indegree[neighbor] == 0) q.offer(neighbor);
        }
    }
    return count == numCourses;
}`,
      python: `from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    indegree = [0] * numCourses
    for dest, src in prerequisites:
        adj[src].append(dest)
        indegree[dest] += 1
    q = deque([i for i in range(numCourses) if indegree[i] == 0])
    count = 0
    while q:
        node = q.popleft()
        count += 1
        for nbr in adj[node]:
            indegree[nbr] -= 1
            if indegree[nbr] == 0:
                q.append(nbr)
    return count == numCourses`
    }
  },
  {
    id: "dsa-graph-2",
    topic: "Graphs",
    title: "Dijkstra's Shortest Path Algorithm",
    difficulty: "Medium",
    companies: ["Microsoft", "Google", "Amazon"],
    leetcodeUrl: "https://www.geeksforgeeks.org/dijkstras-shortest-path-algorithm-greedy-algo-7/",
    description: "Given a weighted, undirected and connected graph of V vertices and source vertex S, find the shortest distance of all vertices from the source vertex.",
    intuition: "Greedy algorithm using a min-priority queue storing `{distance, node}`. Always expand the currently known nearest node and relax adjacent edges. Stop when priority queue is empty.",
    timeComplexity: "O(E log V)",
    spaceComplexity: "O(V + E)",
    solutions: {
      cpp: `vector<int> dijkstra(int V, vector<vector<pair<int,int>>>& adj, int S) {
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
    vector<int> dist(V, 1e9);
    dist[S] = 0;
    pq.push({0, S});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto& edge : adj[u]) {
            int v = edge.first, weight = edge.second;
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
      java: `public static int[] dijkstra(int V, List<List<int[]>> adj, int S) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    int[] dist = new int[V];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[S] = 0;
    pq.offer(new int[]{0, S});
    while (!pq.isEmpty()) {
        int[] top = pq.poll();
        int d = top[0], u = top[1];
        if (d > dist[u]) continue;
        for (int[] edge : adj.get(u)) {
            int v = edge[0], wt = edge[1];
            if (dist[u] + wt < dist[v]) {
                dist[v] = dist[u] + wt;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
      python: `import heapq

def dijkstra(V: int, adj: list[list[tuple[int, int]]], S: int) -> list[int]:
    dist = [float('inf')] * V
    dist[S] = 0
    pq = [(0, S)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, wt in adj[u]:
            if dist[u] + wt < dist[v]:
                dist[v] = dist[u] + wt
                heapq.heappush(pq, (dist[v], v))
    return dist`
    }
  }
];
