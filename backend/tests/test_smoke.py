def test_app_imports():
    import importlib
    mod = importlib.import_module('app')
    assert hasattr(mod, "app")
