<template>
    <div class="py-4">
        <!-- Header and Filter section remains the same -->
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-medium text-gray-700">Transaction list</h3>
            
            <div class="relative">
                <button 
                    @click="isFilterOpen = !isFilterOpen"
                    class="flex items-center space-x-2 px-4 py-2 bg-white border rounded-lg shadow-sm"
                >
                    <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span class="text-gray-700">{{ selectedFilter }}</span>
                    <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div v-if="isFilterOpen" 
                    class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
                    @click="isFilterOpen = false"
                >
                    <a v-for="filter in filters" 
                        :key="filter"
                        @click="selectedFilter = filter"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                        {{ filter }}
                    </a>
                </div>
            </div>
        </div>

        <div class="mb-6">
            <CoreDateInput 
                v-model="dateRange" 
                placeholder="Select Date Range" 
                :range="true"
                class="w-full"
            />
        </div>

        <!-- Transaction List -->
        <div v-if="!loading && filteredTransactions?.length" class="space-y-2">
            <div
                v-for="transaction in paginatedTransactions"
                :key="transaction.referenceId"
                class="flex items-center justify-between p-4 bg-white rounded-lg border-[0.5px] border-gray-100"
            >
                <div class="flex items-center space-x-4">
                    <div :class="[
                        'w-7 h-7 rounded-full flex items-center justify-center',
                        transaction.creditType === 'Debit' ? 'bg-red-100' : 'bg-green-100'
                    ]">
                        <svg
                            :class="[
                                'w-5 h-5',
                                transaction.creditType === 'Debit' ? 'text-red-500 transform rotate-45' : 'text-green-500 transform -rotate-45'
                            ]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </div>

                    <div>
                        <p class="text-sm font-medium text-gray-900">
                            {{ transaction?.narration ?? 'Nil' }}
                        </p>
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                            <span>{{ transaction.transactionDate }}</span>
                            <span v-if="transaction?.status" 
                                  :class="[
                                    'px-2 py-0.5 rounded-full text-xs',
                                    transaction.status === 'Successfull' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                  ]"
                            >
                                {{ transaction?.status ?? 'Nil' }}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <p class="text-lg font-semibold text-gray-900">
                        ₦{{ formatAmount(transaction.amount) }}
                    </p>
                    <p class="text-sm text-gray-500">{{ transaction?.type ?? 'Nil' }}</p>
                </div>
            </div>
        </div>

        <div v-else-if="!loading && !filteredTransactions?.length" class="flex flex-col items-center space-y-4 mt-10">
            <img src="@/assets/img/withdrawal.png" alt="No transactions" class="w-24" />
            <div class="text-center">
                <p class="text-gray-900 font-semibold text-xl">No transactions yet</p>
                <p class="text-gray-600">Fund your account to get started</p>
            </div>
        </div>

        <section v-else class="w-full rounded-lg max-w-lg">
            <div class="rounded-md h-60 bg-gray-100 animate-pulse p-4 w-full mx-auto mt-10"></div>
        </section>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="flex justify-center items-center mt-6 space-x-2">
            <button
                @click="goToPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
                &laquo;
            </button>

            <!-- First page -->
            <button
                v-if="shouldShowFirst"
                @click="goToPage(1)"
                :class="[
                    'px-3 py-1 rounded-full',
                    1 === currentPage ? 'bg-red-500 text-white' : 'text-gray-600',
                ]"
            >
                1
            </button>

            <!-- Left ellipsis -->
            <span v-if="shouldShowLeftEllipsis" class="px-2 text-gray-600">...</span>

            <!-- Page numbers -->
            <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                    'px-3 py-1 rounded-full',
                    page === currentPage ? 'bg-red-500 text-white' : 'text-gray-600',
                ]"
            >
                {{ page }}
            </button>

            <!-- Right ellipsis -->
            <span v-if="shouldShowRightEllipsis" class="px-2 text-gray-600">...</span>

            <!-- Last page -->
            <button
                v-if="shouldShowLast"
                @click="goToPage(totalPages)"
                :class="[
                    'px-3 py-1 rounded-full',
                    totalPages === currentPage ? 'bg-red-500 text-white' : 'text-gray-600',
                ]"
            >
                {{ totalPages }}
            </button>

            <button
                @click="goToPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="text-gray-500 hover:text-gray-700 disabled:opacity-50"
            >
                &raquo;
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useFetchTransactionHistory } from '@/composables/modules/wallet/useFetchTransactionHistory';

interface Transaction {
    amount: number;
    type: string;
    date: string;
    transactionDate: string;
    narration: string;
    status: string;
    creditType: string;
    sender?: string;
    senderAccountNumber?: string;
    destinationBank?: string;
    destinationAccountNumber?: string;
    receiverName?: string;
    referenceId: string;
    tranId: string;
    isViewReceiptEnabled: boolean;
}

const { transactionHistory, loading, query } = useFetchTransactionHistory();

// Filter dropdown state
const isFilterOpen = ref(false);
const filters = ['All transactions', 'Credit', 'Debit'];
const selectedFilter = ref('All transactions');

// Date range picker model
const dateRange = ref([null, null]);

// Pagination - Changed itemsPerPage to 5
const itemsPerPage = 5;
const currentPage = ref(1);

// Watch for date range changes
watch(dateRange, (newRange) => {
    if (newRange[0] && newRange[1]) {
        query.value.startDate = newRange[0];
        query.value.endDate = newRange[1];
        currentPage.value = 1;
    }
}, { deep: true });

// Watch for filter changes
watch(selectedFilter, () => {
    currentPage.value = 1;
});

// Filter transactions based on selected filter and date range
const filteredTransactions = computed(() => {
    if (!transactionHistory.value) return [];
    
    let filtered = transactionHistory.value;

    if (selectedFilter.value !== 'All transactions') {
        filtered = filtered.filter((t: Transaction) => t.creditType === selectedFilter.value);
    }

    if (dateRange.value[0] && dateRange.value[1]) {
        filtered = filtered.filter((t: Transaction) => {
            const transactionDate = new Date(t.date);
            return transactionDate >= new Date(dateRange.value[0]) && 
                   transactionDate <= new Date(dateRange.value[1]);
        });
    }

    return filtered;
});

// Paginated transactions - Now shows 5 items per page
const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredTransactions.value.slice(start, start + itemsPerPage);
});

// Calculate total pages
const totalPages = computed(() => {
    return Math.ceil(filteredTransactions.value.length / itemsPerPage);
});

// Pagination visibility logic
const visiblePages = computed(() => {
    const delta = 2; // Reduced to show fewer pages in the pagination
    let start = Math.max(currentPage.value - delta, 1);
    let end = Math.min(currentPage.value + delta, totalPages.value);

    // Adjust the start and end to show 5 pages when possible
    const pagesInRange = end - start + 1;
    if (pagesInRange < 5) {
        if (start === 1) {
            end = Math.min(5, totalPages.value);
        } else if (end === totalPages.value) {
            start = Math.max(1, totalPages.value - 4);
        }
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const shouldShowFirst = computed(() => {
    return visiblePages.value[0] > 1;
});

const shouldShowLast = computed(() => {
    return visiblePages.value[visiblePages.value.length - 1] < totalPages.value;
});

const shouldShowLeftEllipsis = computed(() => {
    return visiblePages.value[0] > 2;
});

const shouldShowRightEllipsis = computed(() => {
    return visiblePages.value[visiblePages.value.length - 1] < totalPages.value - 1;
});

// Format amount with proper separators
function formatAmount(amount: number): string {
    return amount.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Navigation
function goToPage(page: number) {
    if (page > 0 && page <= totalPages.value) {
        currentPage.value = page;
    }
}
</script>