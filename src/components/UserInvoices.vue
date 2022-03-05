<template>
  <q-markup-table class="mb-5">
    <thead>
      <tr>
        <th class="text-center">Date</th>
        <th class="text-left w-1/2">Description</th>
        <th class="text-center"></th>
        <th class="text-right">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-center">12/01/2021</td>
        <td class="text-left">Payment montly #123</td>
        <td class="text-center">
          <q-chip dense color="warning" label="Pending"  class="opacity-70 text-uppercase text-xs font-bold text-white" />
        </td>
        <td class="text-right">IDR. 125.000</td>
      </tr>
      <tr>
        <td class="text-center">12/01/2021</td>
        <td class="text-left">Payment montly #125</td>
        <td class="text-center">
          <q-chip dense color="negative" label="Cancel" class="opacity-70 text-uppercase text-xs font-bold text-white" />
        </td>
        <td class="text-right">IDR. 125.000</td>
      </tr>
      <tr>
        <td class="text-center">12/01/2021</td>
        <td class="text-left">Payment montly #123</td>
        <td class="text-center">
          <q-chip dense color="positive" label="Paid"  class="opacity-70 text-uppercase text-xs font-bold text-white" />
        </td>
        <td class="text-right">IDR. 125.000</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>
