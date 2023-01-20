## example of implementation

```
<Route
      exact
      path='/create'
      element={
        <ProtectedRoute user={user}>
          <CreationPage />
        </ProtectedRoute>
      }
    /> 
```